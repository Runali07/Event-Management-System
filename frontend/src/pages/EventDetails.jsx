import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.log("Error fetching event:", error);
        toast.error("Failed to load event details");
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post(`/registrations/${id}`);
      toast.success("You are registered successfully 🎉");
      navigate("/my-registrations");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (!event) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading event...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg">
        <img
          src={event.image || "https://via.placeholder.com/800x350"}
          alt={event.title}
          className="details-image"
        />

        <div className="card-body p-4">
          <span className="badge bg-warning text-dark mb-3">
            {event.category}
          </span>

          <h2 className="fw-bold mb-3">{event.title}</h2>

          <p className="mb-4 text-muted">{event.description}</p>

          <div className="row mb-3">
            <div className="col-md-6">
              <p>
                <strong>📅 Date:</strong> {event.date}
              </p>
              <p>
                <strong>⏰ Time:</strong> {event.time}
              </p>
              <p>
                <strong>📍 Location:</strong> {event.location}
              </p>
            </div>

            <div className="col-md-6">
              <p>
                <strong>💰 Price:</strong> ₹{event.price}
              </p>
              <p>
                <strong>🎟 Seats Left:</strong>{" "}
                <span className="text-danger fw-bold">{event.seats}</span>
              </p>
              <p>
                <strong>🏷 Category:</strong> {event.category}
              </p>
            </div>
          </div>

          <button className="btn btn-success btn-lg" onClick={handleRegister}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}