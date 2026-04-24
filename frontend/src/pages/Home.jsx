import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Smart Event Management Platform</span>

            <h1 className="hero-title">
              Plan, Manage and Experience Events with Eventora
            </h1>

            <p className="hero-text">
              Eventora helps colleges, communities, and organizations manage
              registrations, schedules, event discovery, and attendee
              engagement in one elegant platform.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/events" className="btn btn-brand btn-lg">
                Explore Events
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title text-center mb-5">Why Eventora?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card h-100">
              <h4>Fast Registration</h4>
              <p>
                Join events quickly with a smooth registration flow, secure
                login, and instant confirmation.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card h-100">
              <h4>Smart Event Discovery</h4>
              <p>
                Browse workshops, competitions, cultural activities, seminars,
                and many more events in one place.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card h-100">
              <h4>Admin Control</h4>
              <p>
                Admins can add events, manage event details, and monitor the
                registration experience with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <div className="stats-card">
              <h3>30+</h3>
              <p>Events Hosted</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <h3>500+</h3>
              <p>Registrations</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <h3>10+</h3>
              <p>Categories</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <h3>24/7</h3>
              <p>Access</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title text-center mb-5">How It Works</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="how-card h-100">
              <h4>01. Create Account</h4>
              <p>Register securely and access your personalized event journey.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="how-card h-100">
              <h4>02. Discover Events</h4>
              <p>Explore events by interest, category, and availability.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="how-card h-100">
              <h4>03. Register & Attend</h4>
              <p>Reserve your seat and keep track of your event participation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Make every event easier to manage</h2>
          <p className="mb-0">
            Eventora is built to make college and community events feel modern,
            organized, and user-friendly.
          </p>
        </div>
      </section>
    </>
  );
}