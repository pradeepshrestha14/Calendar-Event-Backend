const nodemailer = require("nodemailer");

// / Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.NODE_MAIL_USER,
    pass: process.env.NODE_MAIL_PASS,
  },
});

module.exports = transporter;
