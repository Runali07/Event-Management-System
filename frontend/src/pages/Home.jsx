import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container text-white">
          <div className="hero-content">
            <h1 className="display-3 fw-bold mb-3">Manage Events Smarter</h1>

            <p className="lead mb-4">
              EventSphere is a modern event management platform for colleges,
              communities, and organizations to create, manage, and join events
              with ease.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link to="/events" className="btn btn-warning btn-lg">
                Explore Events
              </Link>

              <Link to="/register" className="btn btn-outline-light btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="section-title text-center mb-5">Why EventSphere?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 h-100 feature-card">
              <h4 className="mb-3">⚡ Easy Registration</h4>
              <p className="text-muted">
                Register for events in seconds with a simple and smooth process.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ One-click event booking</li>
                <li>✔ Instant confirmation</li>
                <li>✔ Secure authentication</li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 h-100 feature-card">
              <h4 className="mb-3">📅 Smart Scheduling</h4>
              <p className="text-muted">
                Keep track of all upcoming events in a well-organized dashboard.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Real-time event updates</li>
                <li>✔ Organized event listings</li>
                <li>✔ Search and filter options</li>
              </ul>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 h-100 feature-card">
              <h4 className="mb-3">🎯 Admin Control</h4>
              <p className="text-muted">
                Powerful admin tools to manage events efficiently and smoothly.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Add and manage events</li>
                <li>✔ Monitor registrations</li>
                <li>✔ Role-based access control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-4 h-100 feature-card">
              <h2 className="fw-bold text-dark mb-2">25+</h2>
              <p className="text-muted mb-0">Events Hosted</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-4 h-100 feature-card">
              <h2 className="fw-bold text-dark mb-2">300+</h2>
              <p className="text-muted mb-0">Registrations</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-4 h-100 feature-card">
              <h2 className="fw-bold text-dark mb-2">10+</h2>
              <p className="text-muted mb-0">Event Categories</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-4 h-100 feature-card">
              <h2 className="fw-bold text-dark mb-2">24/7</h2>
              <p className="text-muted mb-0">Platform Access</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="section-title text-center mb-5">Featured Events</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card event-card shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865"
                className="card-img-top"
                alt="Tech Fest 2026"
              />
              <div className="card-body">
                <h5 className="fw-bold">Tech Fest 2026</h5>
                <p className="text-muted">
                  Coding contests, robotics, workshops and cultural events.
                </p>
                <Link to="/events" className="btn btn-dark">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card event-card shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                className="card-img-top"
                alt="Startup Meetup"
              />
              <div className="card-body">
                <h5 className="fw-bold">Startup Meetup</h5>
                <p className="text-muted">
                  Networking with founders, investors and entrepreneurs.
                </p>
                <Link to="/events" className="btn btn-dark">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card event-card shadow-sm h-100">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
                className="card-img-top"
                alt="Music Night"
              />
              <div className="card-body">
                <h5 className="fw-bold">Music Night</h5>
                <p className="text-muted">
                  Enjoy live performances, entertainment and unforgettable vibes.
                </p>
                <Link to="/events" className="btn btn-dark">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="section-title text-center mb-5">How It Works</h2>

        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 feature-card h-100">
              <h4>1️⃣ Register</h4>
              <p className="text-muted">
                Create your account in just a few seconds.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 feature-card h-100">
              <h4>2️⃣ Explore Events</h4>
              <p className="text-muted">
                Browse events based on your interests and preferences.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 feature-card h-100">
              <h4>3️⃣ Register & Attend</h4>
              <p className="text-muted">
                Book your seat instantly and enjoy the event experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-center py-5"
        style={{ background: "#111827", color: "white" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to join amazing events?</h2>
          <p className="mb-4">
            Sign up now and start exploring events near you.
          </p>

          <Link to="/register" className="btn btn-warning btn-lg">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}