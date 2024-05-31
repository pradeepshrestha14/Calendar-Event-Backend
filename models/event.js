// models/Item.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// title,
//       eventDate,
//       description,
//       startTime,
//       endTime,
//       participants,
//       timezone,

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
