const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/messageSchema');
const { Resend } = require('resend');

/** Avoid noisy / PII-heavy logs in production; keep errors on console.error */
const devLog =
    process.env.NODE_ENV !== 'production' ? (...args) => console.log(...args) : () => {};

/**
 * Mail via Resend (HTTPS — works on Render free tier unlike SMTP port 465/587).
 * Set RESEND_API_KEY, RESEND_FROM, and EMAIL in Render env vars.
 *
 * RESEND_FROM   – sender address, e.g. "Portfolio <onboarding@resend.dev>" or a verified domain
 * EMAIL         – your own email to receive admin notifications
 *
 * NOTE: Resend's onboarding@resend.dev sandbox can only deliver to the
 * account owner's email. To send confirmations to arbitrary visitors you
 * must add a verified domain in the Resend dashboard and update RESEND_FROM.
 */
function getResendClient() {
    const apiKey = (process.env.RESEND_API_KEY || '').trim();
    if (!apiKey) return null;
    return new Resend(apiKey);
}

function getResendFrom() {
    return (process.env.RESEND_FROM || process.env.EMAIL || '').trim() || null;
}

function getAdminEmail() {
    return (process.env.EMAIL || process.env.MAIL_USER || '').trim() || null;
}

/** Returns true when mail is configured; used to decide response shape. */
function isMailConfigured() {
    return !!(getResendClient() && getResendFrom() && getAdminEmail());
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
 * Mail runs after the HTTP response — never block the client on slow SMTP (e.g. Gmail from cloud hosts).
 */
async function sendContactMailInBackgroundFromSubmission({ fname, lname, email, mobile, message }) {
    const resend = getResendClient();
    const from = getResendFrom();
    const adminEmail = getAdminEmail();

    if (!resend || !from || !adminEmail) {
        console.warn('[mail] Resend not configured — skipping email.');
        return;
    }

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

    // Admin notification
    try {
        const { error } = await resend.emails.send({
            from,
            to: adminEmail,
            subject: 'New Contact Form Submission',
            html: adminHtml,
        });
        if (error) throw new Error(JSON.stringify(error));
        devLog('[register] admin mail ok');
    } catch (e) {
        console.error('[register] admin mail failed:', e.message);
    }

    // User confirmation — may fail on sandbox (onboarding@resend.dev) if recipient ≠ account owner
    try {
        const { error } = await resend.emails.send({
            from,
            to: email,
            subject: 'Thanks for your message — Satyam',
            html: userHtml,
        });
        if (error) throw new Error(JSON.stringify(error));
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

        if (!isMailConfigured()) {
            return res.status(201).json({
                message:
                    'Message saved. Email is not configured on the server (optional: RESEND_API_KEY + RESEND_FROM + EMAIL).',
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
