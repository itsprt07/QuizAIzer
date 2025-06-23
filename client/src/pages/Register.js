// src/pages/Register.js

import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";
import "./Register.css"; // ✅ Now using themed styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", formData);
      saveToken(res.data.token);
      alert("✅ Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message || "❌ Registration failed";
      setError(message);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <h2>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">🚀 Register</button>
          {error && <p className="error-msg" style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
