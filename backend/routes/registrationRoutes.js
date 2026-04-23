const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const auth = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

/*
  Register for an event
*/
router.post("/:eventId", auth, async (req, res) => {
  console.time("TOTAL_REGISTER");

  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    console.time("findEvent");
    const event = await Event.findById(eventId).select("_id");
    console.timeEnd("findEvent");

    if (!event) {
      console.timeEnd("TOTAL_REGISTER");
      return res.status(404).json({ message: "Event not found" });
    }

    console.time("checkExisting");
    const existing = await Registration.findOne({
      user: userId,
      event: eventId,
    }).select("_id");
    console.timeEnd("checkExisting");

    if (existing) {
      console.timeEnd("TOTAL_REGISTER");
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    console.time("createRegistration");
    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });
    console.timeEnd("createRegistration");

    console.timeEnd("TOTAL_REGISTER");

    res.status(201).json({
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    console.timeEnd("TOTAL_REGISTER");
    console.log("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
  Get logged-in user's registrations
*/
router.get("/my/all", auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.log("My registrations error:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
  Get all registrations (admin only)
*/
router.get("/admin/all", auth, allowRoles("admin"), async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("event", "title date location")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.log("Admin registrations error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;