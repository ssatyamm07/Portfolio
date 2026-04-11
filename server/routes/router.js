const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/messageSchema');
const nodemailer = require('nodemailer');

/** Avoid noisy / PII-heavy logs in production; keep errors on console.error */
const devLog =
    process.env.NODE_ENV !== 'production' ? (...args) => console.log(...args) : () => {};

/**
 * Mail is optional. If creds are missing, contact form still saves to MongoDB and returns 201.
 * Supports EMAIL + EMAIL_PASS or MAIL_USER + MAIL_PASS.
 * Gmail App Passwords are often shown as "xxxx xxxx xxxx xxxx"; spaces are stripped for SMTP.
 */
function normalizeAppPassword(raw) {
    if (raw == null) return '';
    return String(raw).replace(/\s+/g, '').trim();
}

function getMailCredentials() {
    const user = (process.env.EMAIL || process.env.MAIL_USER || '').trim();
    const pass = normalizeAppPassword(process.env.EMAIL_PASS || process.env.MAIL_PASS);
    if (!user || !pass) return null;
    return { user, pass };
}

function getResendApiKey() {
    return (process.env.RESEND_API_KEY || '').trim();
}

/** Inbox for admin copies of contact form (Resend path). */
function getNotifyInbox() {
    return (
        (process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL || process.env.EMAIL || process.env.MAIL_USER || '')
            .trim() || null
    );
}

function getResendFrom() {
    const raw = (process.env.RESEND_FROM || '').trim();
    if (raw) return raw;
    return 'Portfolio <onboarding@resend.dev>';
}

/** True if we can try to send mail (Resend API or Gmail SMTP). */
function hasOutboundMail() {
    return Boolean(getResendApiKey() || getMailCredentials());
}

function createMailTransport() {
    const creds = getMailCredentials();
    if (!creds) {
        console.warn(
            '[mail] No mail env (set EMAIL + EMAIL_PASS, or MAIL_USER + MAIL_PASS) — saving to DB only.'
        );
        return null;
    }

    // Explicit host/port: more reliable from cloud hosts (e.g. Render) than service: 'gmail' alone.
    // family: 4 avoids some IPv6 routing issues to Google SMTP.
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: creds.user, pass: creds.pass },
        connectionTimeout: 45000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
        family: 4,
    });
}

function sendMailWithTimeout(transporter, mailOptions, label, ms = 28000) {
    return Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`${label}: send timed out after ${ms}ms`)), ms)
        ),
    ]);
}

/**
 * Resend over HTTPS — reliable from cloud hosts where Gmail SMTP often never connects.
 * @param {{ to: string; subject: string; html: string; label: string }} opts
 */
async function sendViaResend({ to, subject, html, label }) {
    const apiKey = getResendApiKey();
    if (!apiKey) throw new Error(`${label}: RESEND_API_KEY not set`);

    const from = getResendFrom();
    const ctrl = new AbortController();
    const ms = 25000;
    const timer = setTimeout(() => ctrl.abort(), ms);

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: [to],
                subject,
                html,
            }),
            signal: ctrl.signal,
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            const msg = data.message || data.name || res.statusText || `HTTP ${res.status}`;
            throw new Error(`${label}: ${msg}`);
        }
    } catch (e) {
        if (e.name === 'AbortError') {
            throw new Error(`${label}: Resend request timed out after ${ms}ms`);
        }
        throw e;
    } finally {
        clearTimeout(timer);
    }
}

function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Mail runs after the HTTP response — never block the client.
 * Prefers Resend (HTTPS) when RESEND_API_KEY is set; otherwise Gmail SMTP via nodemailer.
 */
async function sendContactMailInBackgroundFromSubmission({ fname, lname, email, mobile, message }) {
    const safeFname = escapeHtml(fname);
    const safeLname = escapeHtml(lname);
    const safeEmail = escapeHtml(email);
    const safeMobile = escapeHtml(mobile);
    const safeMessage = escapeHtml(message);

    const adminHtml = `
                <h3>Contact Form Submission</h3>
                <p><strong>Name:</strong> ${safeFname} ${safeLname}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Mobile:</strong> ${safeMobile}</p>
                <p><strong>Message:</strong> ${safeMessage}</p>
            `;

    const userHtml = `
                <h3>Hi ${safeFname},</h3>
                <p>Thanks for taking a moment to write in through my portfolio — I really appreciate it.</p>
                <p>I've got your note and I'll reply as soon as I can.</p>
                <p><strong>What you sent:</strong> ${safeMessage}</p>
                <br />
                <p>Cheers,<br/>Satyam Kumar</p>
            `;

    if (getResendApiKey()) {
        const adminTo = getNotifyInbox();
        if (!adminTo) {
            console.error(
                '[register] Resend: set NOTIFY_EMAIL, ADMIN_EMAIL, or EMAIL so admin notifications have a recipient.'
            );
        } else {
            try {
                await sendViaResend({
                    to: adminTo,
                    subject: 'New Contact Form Submission',
                    html: adminHtml,
                    label: 'Admin notification (Resend)',
                });
                devLog('[register] admin mail ok (Resend)');
            } catch (e) {
                console.error('[register] admin mail failed:', e.message);
            }
        }
        try {
            await sendViaResend({
                to: email,
                subject: 'Thanks for your message — Satyam',
                html: userHtml,
                label: 'User confirmation (Resend)',
            });
            devLog('[register] user mail ok (Resend)');
        } catch (e) {
            console.error('[register] user mail failed:', e.message);
        }
        return;
    }

    const transporter = createMailTransport();
    if (!transporter) return;

    const creds = getMailCredentials();
    if (!creds) return;

    const fromAddr = creds.user;
    const adminMailOptions = {
        from: fromAddr,
        to: fromAddr,
        subject: 'New Contact Form Submission',
        html: adminHtml,
    };

    const userMailOptions = {
        from: fromAddr,
        to: email,
        subject: 'Thanks for your message — Satyam',
        html: userHtml,
    };

    try {
        await sendMailWithTimeout(transporter, adminMailOptions, 'Admin notification');
        devLog('[register] admin mail ok');
    } catch (e) {
        console.error('[register] admin mail failed:', e.message);
    }
    try {
        await sendMailWithTimeout(transporter, userMailOptions, 'User confirmation');
        devLog('[register] user mail ok');
    } catch (e) {
        console.error('[register] user mail failed:', e.message);
    }
}


function saveMessageWithTimeout(doc, ms = 20000) {
    return Promise.race([
        doc.save(),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`MongoDB save timed out after ${ms}ms`)), ms)
        ),
    ]);
}

// POST /register route
router.post('/register', async (req, res) => {
    try {
        const { fname, lname, email, mobile, message } = req.body || {};
        devLog('[register] submission', { messageLen: message?.length });

        if (!fname || !lname || !email || !mobile || !message) {
            return res.status(422).json({ error: 'Please fill all fields' });
        }

        if (mongoose.connection.readyState !== 1) {
            console.error('[register] MongoDB not connected, readyState=', mongoose.connection.readyState);
            return res.status(503).json({
                error: 'Database is not ready. Try again in a few seconds.',
                saved: false,
            });
        }

        let newMessage;
        try {
            newMessage = new Message({ fname, lname, email, mobile, message });
            await saveMessageWithTimeout(newMessage);
            devLog('[register] saved to MongoDB, id:', newMessage._id);
        } catch (err) {
            console.error('[register] MongoDB save error:', err.message);
            return res.status(500).json({ error: 'Could not save message. Check DATABASE / MongoDB.' });
        }

        if (!hasOutboundMail()) {
            return res.status(201).json({
                message:
                    'Message saved. Email is not configured (set RESEND_API_KEY or EMAIL + EMAIL_PASS).',
                emailSent: false,
                saved: true,
            });
        }

        res.status(201).json({
            message:
                'Thanks — your message is saved. A confirmation email may follow if SMTP succeeds.',
            saved: true,
            emailPending: true,
        });

        const payload = { fname, lname, email, mobile, message };
        setImmediate(() => {
            sendContactMailInBackgroundFromSubmission(payload).catch((err) => {
                console.error('[register] background mail:', err);
            });
        });
        return;
    } catch (unexpected) {
        console.error('[register] unexpected error:', unexpected);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
});

module.exports = router;
