// routes/items.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { scheduleEmailNotification, sendEmailNotification } = require("../util");
// const app = require("../app");
// Endpoint to create a new event

// const moment = require("moment-timezone");
router.post("/create", async (req, res) => {
  try {
    // Extract event data from request body
    const {
      title,
      eventDate,
      description,
      startTime,
      endTime,
      participants,
      timezone,
    } = req.body;

    // Create new event instance
    const newEvent = new Event({
      title,
      eventDate,
      description,
      startTime,
      endTime,
      participants,
      timezone,
    });

    await newEvent.save(newEvent);
    scheduleEmailNotification(newEvent);
    res.status(201).send(newEvent);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

module.exports = router;
