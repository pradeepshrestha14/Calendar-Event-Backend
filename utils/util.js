const transporter = require("../nodemail");
const cron = require("node-cron");

function scheduleEmailNotification(event) {
  const eventDate = new Date(event.eventDate.toLocaleString());
  const minute = eventDate.getMinutes();
  const hour = eventDate.getHours();
  const day = eventDate.getDate();
  const month = eventDate.getMonth() + 1; // Month in JavaScript starts from 0
  // const year = eventDate.getFullYear();

  // Format the cron pattern
  const cronPattern = `0 ${minute} ${hour} ${month} ${day} *`;

  cron.schedule(cronPattern, function () {
    sendEmailNotification(event);
  });
}

// Function to send email notifications
function sendEmailNotification(event) {
  const mailOptions = {
    from: "pradeepstha14@gmail.com",
    to: event?.participants || [],
    subject: `Reminder: ${event.title} is starting soon`,
    text: `The event titled "${event.title}" is starting at ${event.startTime}. Don't miss it!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { scheduleEmailNotification, sendEmailNotification };
