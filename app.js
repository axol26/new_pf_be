const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CORS }))

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    const mailOptions = {
        // from: email,
        to: email,
        subject: subject,
        text: `Hi ${name},\n\n\tThank you for connecting!\n\n\tMessage Content:\n\t${message}\n\n\tRest assured that your message is received and I'll be in touch soon.\n\nRegards,\nLeonard`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ error: 'Error sending email', details: error.message });
        } else {
            res.status(200).json({ message: 'Email sent successfully', info });
            const mailSelf = {
                // from: email,
                to: process.env.EMAIL_USER,
                subject: subject,
                text: `Name: ${name}\nEmail: ${email}\nMessage:\n\t${message}`
            };
            transporter.sendMail(mailSelf);
        }
    });
    
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});