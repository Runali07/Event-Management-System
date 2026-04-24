import React, { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseEventDate = (dateString) => {
    if (!dateString) return new Date(0);

    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) return parsed;

    return new Date(0);
  };

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const res = await API.get("/registrations/my/all");

        const sortedRegistrations = [...res.data].sort((a, b) => {
          const dateA = parseEventDate(a.event?.date);
          const dateB = parseEventDate(b.event?.date);
          return dateA - dateB;
        });

        setRegistrations(sortedRegistrations);
      } catch (error) {
        toast.error("Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const getStatus = (date) => {
    const today = new Date();
    const eventDate = new Date(date);

    if (eventDate.toDateString() === today.toDateString()) return "Today";
    if (eventDate < today) return "Past";
    return "Upcoming";
  };

  const downloadTicket = (event) => {
  const doc = new jsPDF();
  const user = JSON.parse(localStorage.getItem("user"));
  const ticketId = Math.random().toString(36).substring(2, 10).toUpperCase();

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 297, "F");

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(12, 12, 186, 34, 6, 6, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Eventora Event Pass", 20, 27);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Smart event management platform", 20, 35);

  doc.setFillColor(34, 197, 94);
  doc.roundedRect(145, 20, 38, 12, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIRMED", 151, 28);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(event.title || "Event Ticket", 20, 62);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Your registration has been successfully confirmed.", 20, 70);

  doc.setDrawColor(203, 213, 225);
  doc.line(20, 76, 190, 76);

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
  doc.text(ticketId, 26, 140);

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

  doc.setDrawColor(203, 213, 225);
  doc.line(20, 268, 190, 268);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.text("Powered by Eventora", 20, 277);
  doc.text("Thank you for registering", 145, 277);

  const safeTitle = (event.title || "event-ticket")
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();

  doc.save(`${safeTitle}_ticket.pdf`);
};

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading your registrations...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">My Registrations</h2>

      {registrations.length === 0 ? (
        <p>No registrations yet</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {registrations.map((reg) => {
            const event = reg.event;
            const status = getStatus(event.date);

            return (
              <div key={reg._id} className="horizontal-card">
                <div className="card-left">
                  <h5 className="fw-bold mb-1">{event.title}</h5>

                  <p className="mb-1">
                    📅 {event.date} | ⏰ {event.time}
                  </p>

                  <p className="mb-1">
                    📍 {event.location}
                  </p>

                  <p className="reminder-text">
                    {status === "Today"
                      ? "Your event is today!"
                      : status === "Upcoming"
                      ? `Reminder: ${event.date}`
                      : "Event completed"}
                  </p>
                </div>

                <div className="card-right">
                  <span className={`status-badge status-${status.toLowerCase()}`}>
                    {status}
                  </span>

                  <button
                    className="btn btn-brand mt-2"
                    onClick={() => downloadTicket(event)}
                  >
                    Download Ticket
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}