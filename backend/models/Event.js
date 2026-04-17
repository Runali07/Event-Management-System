const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "" },
    price: { type: Number, default: 0 },
    seats: { type: Number, default: 100 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);