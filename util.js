const transporter = require("./nodemail");
const cron = require("node-cron"); // Import node-cron
const moment = require("moment-timezone");

// const newEvent = new Event({
//     name,
//     eventDate: parsedEventDate,
//     description,
//     startTime,
//     endTime,
//     participants,
//   });

// Function to schedule email notifications
function scheduleEmailNotification(event) {
  const eventDateTimeServer = event?.exactEventDate;

  // Start time string
  let startTime = "03:32";

  // Parse the start time string
  let [hours, minutes] = startTime.split(":").map(Number);

  // Create a new Date object
  let date = moment();

  // Set the hours and minutes
  date.hours(hours);
  date.minutes(minutes);

  cron.schedule(
    date.format("m H D M *"),
    () => {
      console.log("fast Running a job at 01:00 at America/Sao_Paulo timezone");
      sendEmailNotification(event);
    },
    {
      scheduled: true,
      timezone: "Asia/Kathmandu",
    }
  );
}

// Function to send email notifications
function sendEmailNotification(event) {
  console.log("000000000000000000000start email<><><><><><><>><>>", event);

  const mailOptions = {
    from: "pradeepstha14@gmail.com",
    // to: event.participants.join(","),
    to: ["shrestha.pradeep.996@gmail.com"],

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
