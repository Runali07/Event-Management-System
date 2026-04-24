import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({
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
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back to Eventora</h2>
<p className="auth-subtitle">
  Login to manage registrations and discover upcoming events.
</p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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

          <button className="w-100 auth-btn-dark">
            Login
          </button>
        </form>

        <p className="auth-link-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}