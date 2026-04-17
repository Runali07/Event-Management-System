import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">
          Join EventSphere and start registering for events easily.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control auth-input mb-3"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control auth-input mb-3"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <div className="password-wrapper mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control auth-input"
              placeholder="Create a password"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button className="w-100 auth-btn-green">
            Register
          </button>
        </form>

        <p className="auth-link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}