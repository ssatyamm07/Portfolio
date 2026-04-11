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

function createMailTransport() {
    const creds = getMailCredentials();
    if (!creds) {
        console.warn(
            '[mail] No mail env (set EMAIL + EMAIL_PASS, or MAIL_USER + MAIL_PASS) — saving to DB only.'
        );
        return null;
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: { user: creds.user, pass: creds.pass },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 25000,
    });
}

function sendMailWithTimeout(transporter, mailOptions, label, ms = 22000) {
    return Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`${label}: send timed out after ${ms}ms`)), ms)
        ),
    ]);
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

        const transporter = createMailTransport();
        if (!transporter) {
            return res.status(201).json({
                message:
                    'Message saved. Email is not configured on the server (optional: EMAIL + EMAIL_PASS).',
                emailSent: false,
                saved: true,
            });
        }

        const fromAddr = getMailCredentials().user;
        const adminMailOptions = {
            from: fromAddr,
            to: fromAddr,
            subject: 'New Contact Form Submission',
            html: `
                <h3>Contact Form Submission</h3>
                <p><strong>Name:</strong> ${fname} ${lname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        const userMailOptions = {
            from: fromAddr,
            to: email,
            subject: 'Thanks for your message — Satyam',
            html: `
                <h3>Hi ${fname},</h3>
                <p>Thanks for taking a moment to write in through my portfolio — I really appreciate it.</p>
                <p>I've got your note and I'll reply as soon as I can.</p>
                <p><strong>What you sent:</strong> ${message}</p>
                <br />
                <p>Cheers,<br/>Satyam Kumar</p>
            `,
        };

        const mailErrors = [];

        try {
            await sendMailWithTimeout(transporter, adminMailOptions, 'Admin notification');
            devLog('[register] admin mail ok');
        } catch (e) {
            console.error('[register] admin mail failed:', e.message);
            mailErrors.push(`Admin copy: ${e.message}`);
        }

        try {
            await sendMailWithTimeout(transporter, userMailOptions, 'User confirmation');
            devLog('[register] user mail ok');
        } catch (e) {
            console.error('[register] user mail failed:', e.message);
            mailErrors.push(`Confirmation to user: ${e.message}`);
        }

        if (mailErrors.length === 0) {
            return res.status(201).json({
                message: 'Message sent and emails delivered.',
                emailSent: true,
                saved: true,
            });
        }

        if (mailErrors.length === 2) {
            return res.status(201).json({
                message:
                    'Message saved, but email could not be sent. Check EMAIL / EMAIL_PASS (Gmail App Password) in Render.',
                details: mailErrors,
                saved: true,
                emailSent: false,
            });
        }

        return res.status(201).json({
            message: 'Message saved; one email may have failed — check server logs.',
            details: mailErrors,
            saved: true,
            emailSent: mailErrors.length === 0,
        });
    } catch (unexpected) {
        console.error('[register] unexpected error:', unexpected);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
});

module.exports = router;
