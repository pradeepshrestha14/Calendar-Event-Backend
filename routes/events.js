const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const { scheduleEmailNotification } = require("../utils/util");

// Endpoint to create a new event
router.post("/create", async (req, res) => {
  try {
    const {
      title,
      eventDate,
      eventEndDate,
      description,
      startTime,
      endTime,
      participants,
    } = req.body;

    // Create new event instance
    const newEvent = new Event({
      title,
      eventDate,
      eventEndDate,
      description,
      startTime,
      endTime,
      participants,
    });

    await newEvent.save(newEvent);
    // todo : uncomment
    scheduleEmailNotification(newEvent);
    res.status(201).send({ success: true, event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// Update an event by ID
router.put("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update is valid according to the schema
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    scheduleEmailNotification(updatedEvent);

    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to getAll events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ isDeleted: false });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Endpoint to "delete" an event
router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    res.status(200).send(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
