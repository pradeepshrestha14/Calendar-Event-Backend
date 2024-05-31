const nodemailer = require("nodemailer");

// / Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: "pradeepstha14@gmail.com",
    pass: "",
    // dyhm bgij vcxx rsgf
  },
});

module.exports = transporter;
