const express = require('express');
const router = express.Router();
const users = require('../models/userSchema'); // User model for storing user data
const Message = require('../models/messageSchema'); // Message model for storing messages
const nodemailer = require('nodemailer');

// transporter config for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// POST /register route
router.post('/register', async (req, res) => {
    const { fname, lname, email, mobile, message } = req.body;
    console.log("Incoming request:", req.body);

    // Check for missing fields
    if (!fname || !lname || !email || !mobile || !message) {
        return res.status(422).json({ error: "Please fill all fields" });
    }

    try {
        // Save to the messages collection
        const newMessage = new Message({ fname, lname, email, mobile, message });
        await newMessage.save();

        // Optionally, you can also save the user data to the users collection, if needed
        // const newUser = new users({ fname, lname, email, mobile });
        // await newUser.save();

        // Admin Email (Notification to You)
        const adminMailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "New Contact Form Submission",
            html: `
                <h3>Contact Form Submission</h3>
                <p><strong>Name:</strong> ${fname} ${lname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        // Confirmation Email (To User)
        const userMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Thank you for contacting us!",
            html: `
                <h3>Hi ${fname},</h3>
                <p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p>
                <p><strong>Your Message:</strong> ${message}</p>
                <br />
                <p>Best regards,<br/>Support Team</p>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return res.status(201).json({ message: "Message sent and confirmation email delivered." });
    } catch (err) {
        console.error("Error in register route:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
