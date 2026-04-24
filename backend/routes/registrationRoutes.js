const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const User = require("../models/User");
const sendRegistrationEmail = require("../utils/sendEmail");
const auth = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/:eventId", auth, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.seats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const existing = await Registration.findOne({
      user: userId,
      event: eventId,
    }).select("_id");

    if (existing) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    event.seats -= 1;
    await event.save();

    const user = await User.findById(userId).select("name email");
    console.log("User found for email:", user);

    if (user?.email) {
      try {
        console.log("Sending email to:", user.email);

        await sendRegistrationEmail({
  to: user.email,
  name: user.name,
  event,
});

        console.log("Email sent successfully");
      } catch (mailError) {
        console.log("Email sending failed:", mailError);
      }
    } else {
      console.log("No user email found");
    }

    res.status(201).json({
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/check/:eventId", auth, async (req, res) => {
  try {
    const existing = await Registration.findOne({
      user: req.user.id,
      event: req.params.eventId,
    }).select("_id");

    res.json({ registered: !!existing });
  } catch (error) {
    console.log("Check registration error:", error);
    res.status(500).json({ message: error.message });
  }
});

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