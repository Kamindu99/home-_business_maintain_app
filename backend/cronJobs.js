const nodemailer = require('nodemailer');

// Configure your SMTP transport
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "wanigasinghebookcollection@gmail.com",
        pass: 'rkpc rkjt uhth fiak'
    },
});

async function cronJobs(req, res) {
    try {
        await sendReminderEmailsAndCalculatePanalties(); // Function that contains your email sending logic
        res.status(200).json({ message: 'Reminder emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Failed to send emails' });
    }
}

module.exports = cronJobs;