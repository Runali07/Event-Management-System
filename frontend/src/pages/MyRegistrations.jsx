import React, { useEffect, useState } from "react";
import API from "../api";

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await API.get("/registrations/my/all");
        setRegistrations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Registrations</h2>

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        registrations.map((item) => (
          <div className="card shadow p-3 mb-3" key={item._id}>
            <h5>{item.event?.title}</h5>
            <p><strong>Date:</strong> {item.event?.date}</p>
            <p><strong>Location:</strong> {item.event?.location}</p>
          </div>
        ))
      )}
    </div>
  );
}