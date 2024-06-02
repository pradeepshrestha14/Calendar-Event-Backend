const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
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
  eventEndDate: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

module.exports = Event;
