const transporter = require("../nodemail");
const cron = require("node-cron");
const moment = require("moment-timezone");

function scheduleEmailNotification(event) {
  // const eventDate = new Date(event.eventDate.toLocaleString());
  // const minute = eventDate.getMinutes();
  // const hour = eventDate.getHours();
  // const day = eventDate.getDate();
  // const month = eventDate.getMonth() + 1; // Month in JavaScript starts from 0
  // const year = eventDate.getFullYear();

  // Format the cron pattern

  // ==========

  const localDate = moment.tz(event?.eventDate, moment.tz.guess());
  // / Extract the local time components
  const minute = localDate.minute();
  const hour = localDate.hour();
  const day = localDate.date();
  const month = localDate.month() + 1; // month is 0-indexed in moment.js
  // const dayOfWeek = localDate.day(); // 0-6 (Sun-Sat)
  // const cronPattern = `0 ${minute} ${hour} ${day}$ {month} *`;
  const cronPattern = `0 ${minute} ${hour} ${day} ${month} *`;

  console.log("date<<<<<<<<<<<<<<<<<", {
    minute,
    hour,
    month,
    day,

    event,
    // eventDate,
    cronPattern,
    localDate
  });

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
