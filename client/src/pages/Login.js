// src/pages/Login.js

import React, { useState } from "react";
import axios from "../api"; // ✅ USE YOUR BASE API CONFIG
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";
import { Typewriter } from "react-simple-typewriter";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  const particlesInit = async (main) => {
    try {
      await loadSlim(main);
    } catch (err) {
      console.error("Particles engine failed to load:", err);
    }
  };

  return (
    <div className="login-container">
      <Particles
        id="tsparticles"
        className="particles-bg"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#0d0d0d" },
          particles: {
            color: { value: "#00ff88" },
            links: {
              enable: true,
              color: "#00ffaa",
              distance: 120,
              opacity: 0.4,
            },
            move: {
              enable: true,
              speed: 0.4,
              outModes: { default: "bounce" },
            },
            number: { value: 30 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
        }}
      />

      <form onSubmit={handleSubmit} className="login-card animate-slide-in">
        <h2>
          <span>
            <Typewriter
              words={[
                "Create Smart Quizzes ⚡",
                "Protected with JWT-auth 🛡️",
                "Track Your Progress 📈",
                "Powered by Cohere AI 🧠",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h2>

        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={email ? "filled" : ""}
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={password ? "filled" : ""}
          />
          <label>Password</label>
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">🚀 Login</button>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
