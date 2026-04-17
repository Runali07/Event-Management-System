import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await API.get(`/events?search=${search}`);
      setEvents(res.data);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="section-title">All Events</h2>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-dark px-4" onClick={fetchEvents}>
          Search
        </button>
      </div>

      <div className="row">
        {events.length === 0 ? (
          <div className="text-center mt-4">
            <h5>No events found.</h5>
          </div>
        ) : (
          events.map((event) => (
            <div className="col-md-4 mb-4" key={event._id}>
              <div className="card event-card border-0 shadow-sm h-100">
                <div className="position-relative">
                  <img
                    src={event.image || "https://via.placeholder.com/400x220"}
                    className="card-img-top"
                    alt={event.title}
                  />
                  <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                    {event.category}
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{event.title}</h5>

                  <p className="text-muted">
                    {event.description.length > 80
                      ? `${event.description.substring(0, 80)}...`
                      : event.description}
                  </p>

                  <p className="mb-1">📅 {event.date}</p>
                  <p className="mb-2">📍 {event.location}</p>

                  <Link
                    to={`/events/${event._id}`}
                    className="btn btn-dark mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}