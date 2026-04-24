import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registerStatus, setRegisterStatus] = useState("idle");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.log("Error fetching event:", error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
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
      setRegisterStatus("registering");

      await API.post(`/registrations/${id}`);

      const generatedTicketId = Math.random().toString(36).substring(2, 10).toUpperCase();

      toast.success("Registered successfully ");
      setRegisterStatus("registered");
      setShowConfirmation(true);
      setTicketId(generatedTicketId);

      setEvent((prev) => ({
        ...prev,
        seats: Math.max((prev?.seats || 1) - 1, 0),
      }));
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed";

      if (message.toLowerCase().includes("already registered")) {
        setRegisterStatus("alreadyRegistered");
        toast.error("Already registered");
      } else {
        toast.error(message);
        setRegisterStatus("idle");
      }
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: event?.title || "Event",
      text: `Check out this event: ${event?.title || ""}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Event link copied to clipboard");
      }
    } catch (error) {
      console.log("Share cancelled or failed", error);
    }
  };

  const handleDownloadTicket = () => {
  const doc = new jsPDF();
  const user = JSON.parse(localStorage.getItem("user"));

  const pageWidth = doc.internal.pageSize.getWidth();

  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 297, "F");

  // Header
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(12, 12, 186, 34, 6, 6, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Eventora Event Pass", 20, 27);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Smart event management platform", 20, 35);

  // Status badge
  doc.setFillColor(34, 197, 94);
  doc.roundedRect(145, 20, 38, 12, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIRMED", 151, 28);

  // Event title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(event.title, 20, 62);

  // Subtitle
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Your registration has been successfully confirmed.", 20, 70);

  // Divider
  doc.setDrawColor(203, 213, 225);
  doc.line(20, 76, 190, 76);

  // Left info box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(20, 85, 80, 70, 4, 4, "FD");

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("ATTENDEE", 26, 95);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(user?.name || "Guest", 26, 105);
  doc.text(user?.email || "Not Available", 26, 115);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("TICKET ID", 26, 130);

  doc.setTextColor(79, 70, 229);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(ticketId || "EVT000001", 26, 140);

  // Right info box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(110, 85, 80, 70, 4, 4, "FD");

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("DATE", 116, 95);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(event.date || "-", 116, 105);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("TIME", 116, 120);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(event.time || "-", 116, 130);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("PRICE", 116, 145);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`Rs. ${event.price ?? 0}`, 116, 155);

  // Location section
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(20, 168, 170, 34, 4, 4, "FD");

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LOCATION", 26, 180);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const locationLines = doc.splitTextToSize(event.location || "-", 150);
  doc.text(locationLines, 26, 190);

  // Rules / note section
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(20, 214, 170, 42, 4, 4, "FD");

  doc.setTextColor(30, 64, 175);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("IMPORTANT NOTE", 26, 225);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const note =
    "Please carry this ticket or a screenshot on the event day. Arrive at least 15 minutes early and keep a valid ID proof.";
  const noteLines = doc.splitTextToSize(note, 155);
  doc.text(noteLines, 26, 235);

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(20, 268, 190, 268);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.text("Powered by Eventora", 20, 277);
  doc.text("Thank you for registering", 145, 277);

  // Save
  const safeTitle = (event.title || "event-ticket")
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();

  doc.save(`${safeTitle}_ticket.pdf`);
};
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading event details...</h4>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mt-5 text-center">
        <h4>Event not found.</h4>
      </div>
    );
  }

  if (showConfirmation) {
  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="ticket-card shadow-lg">
        <div className="ticket-header">
          <div>
            <p className="ticket-brand">Eventora Premium Pass</p>
            <h2 className="ticket-heading">Registration Confirmed</h2>
            <p className="ticket-subtext">
              Your event seat has been successfully reserved.
            </p>
          </div>

          <div className="ticket-badge">Confirmed</div>
        </div>

        <div className="ticket-divider"></div>

        <div className="ticket-body">
          <h3 className="ticket-event-title">{event.title}</h3>

          <div className="ticket-grid">
            <div className="ticket-info-box">
              <span className="ticket-label">Date</span>
              <span className="ticket-value">{event.date}</span>
            </div>

            <div className="ticket-info-box">
              <span className="ticket-label">Time</span>
              <span className="ticket-value">{event.time}</span>
            </div>

            <div className="ticket-info-box">
              <span className="ticket-label">Location</span>
              <span className="ticket-value">{event.location}</span>
            </div>

            <div className="ticket-info-box">
              <span className="ticket-label">Ticket ID</span>
              <span className="ticket-value ticket-id">{ticketId}</span>
            </div>
          </div>

          <div className="ticket-note-box">
            <p className="mb-1 fw-semibold">Important Note</p>
            <p className="mb-0">
              Please carry this pass or a screenshot on the event day for entry confirmation.
            </p>
          </div>
        </div>

        <div className="ticket-footer-actions">
          <button className="btn btn-brand" onClick={handleDownloadTicket}>
            Download Ticket
          </button>

          <button
            className="btn btn-success"
            onClick={() => navigate("/my-registrations")}
          >
            My Registrations
          </button>

          <button
            className="btn btn-outline-dark"
            onClick={() => setShowConfirmation(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
  const isDisabled =
    registerStatus === "registering" ||
    registerStatus === "registered" ||
    registerStatus === "alreadyRegistered" ||
    event.seats <= 0;

  const getButtonContent = () => {
    if (registerStatus === "registering") {
      return (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Registering...
        </>
      );
    }

    if (registerStatus === "registered") {
      return "Registered";
    }

    if (registerStatus === "alreadyRegistered") {
      return "Already Registered";
    }

    if (event.seats <= 0) {
      return "Sold Out";
    }

    return "Register Now";
  };

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location
  )}`;

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg">
        <img
          src={event.image || "https://via.placeholder.com/800x350"}
          alt={event.title}
          className="details-image"
        />

        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
            <div>
              <span className="badge bg-warning text-dark mb-3">
                {event.category}
              </span>
              <h2 className="fw-bold mb-3">{event.title}</h2>
            </div>

            <button className="btn btn-outline-dark" onClick={handleShare}>
              Share Event
            </button>
          </div>

          <p className="mb-4 text-muted">{event.description}</p>

          <div className="row mb-4">
            <div className="col-md-6">
              <p><strong>📅 Date:</strong> {event.date}</p>
              <p><strong>⏰ Time:</strong> {event.time}</p>
              <p><strong>📍 Location:</strong> {event.location}</p>
              <p>
                <strong>🗺 Maps:</strong>{" "}
                <a href={mapLink} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </p>
            </div>

            <div className="col-md-6">
              <p><strong>💰 Price:</strong> ₹{event.price}</p>
              <p><strong>🎟 Seats Left:</strong> {event.seats}</p>
              <p><strong>🏷 Category:</strong> {event.category}</p>
              <p><strong>📞 Contact:</strong> +91 98765 43210</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="fw-bold mb-3">Event Rules</h4>
            <ul className="text-muted">
              <li>Please arrive at least 15 minutes before the event starts.</li>
              <li>Carry your college ID or valid identity proof.</li>
              <li>Registration is non-transferable once confirmed.</li>
              <li>Follow venue rules and maintain proper discipline.</li>
              <li>Seats are limited and subject to availability.</li>
            </ul>
          </div>

          <button
            className="btn btn-success btn-lg d-flex align-items-center justify-content-center gap-2"
            onClick={handleRegister}
            disabled={isDisabled}
          >
            {getButtonContent()}
          </button>
        </div>
      </div>
    </div>
  );
}