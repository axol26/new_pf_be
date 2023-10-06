const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'https://portfolio0826.netlify.app' }))

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gchromy2021@gmail.com',
        pass: 'paifzckzujpxpoml'
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'gchromy2021@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ error: 'Error sending email', details: error.message });
        } else {
            res.status(200).json({ message: 'Email sent successfully', info });
        }
    });
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});