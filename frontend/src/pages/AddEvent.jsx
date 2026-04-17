import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: "",
    price: 0,
    seats: 100
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/events", form);
      alert("Event added successfully");
      navigate("/events");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add event");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4">
        <h2 className="mb-4">Add Event</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="date"
            placeholder="Date"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="time"
            placeholder="Time"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="seats"
            type="number"
            placeholder="Seats"
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">Add Event</button>
        </form>
      </div>
    </div>
  );
}