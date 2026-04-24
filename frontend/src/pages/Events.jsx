import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/events");
      setAllEvents(res.data);
      setEvents(res.data);
    } catch (error) {
      console.log("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...allEvents];

    if (search.trim()) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((event) => event.category === category);
    }

    setEvents(filtered);
  }, [search, category, allEvents]);

  return (
    <div className="container py-5">
      <h2 className="section-title">All Events</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select form-select-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Workshop">Workshop</option>
            <option value="Competition">Competition</option>
            <option value="Cultural">Cultural</option>
            <option value="College">College</option>
            <option value="Seminar">Seminar</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Networking">Networking</option>
            <option value="Awareness">Awareness</option>
            <option value="Wellness">Wellness</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <h5>Loading events...</h5>
        </div>
      ) : (
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
      )}
    </div>
  );
}