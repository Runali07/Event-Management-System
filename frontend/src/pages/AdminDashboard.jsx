import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2>Admin Dashboard</h2>
        <p>Manage your event platform from here.</p>

        <Link to="/admin/add-event" className="btn btn-dark mt-3">
          Add New Event
        </Link>
      </div>
    </div>
  );
}