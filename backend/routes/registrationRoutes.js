const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const auth = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const existing = await Registration.findOne({
      user: req.user.id,
      event: req.params.eventId
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: req.params.eventId
    });

    res.status(201).json({ message: "Registered successfully", registration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/my/all", auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id }).populate("event");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/admin/all", auth, allowRoles("admin"), async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("event", "title date location");

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;