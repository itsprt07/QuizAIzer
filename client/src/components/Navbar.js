import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload(); // ensures full logout effect
  };

  // ✅ If current route is a public quiz attempt, hide auth buttons
  const isAttemptRoute = location.pathname.startsWith("/attempt/");

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>QuizAIzer</h2>

      {/* 🔒 Hide these buttons on /attempt/:id route */}
      {!isAttemptRoute && (
        <div style={styles.links}>
          {isAuthenticated() ? (
            <>
              <Link style={styles.link} to="/dashboard">Dashboard</Link>
              <Link style={styles.link} to="/create">Create Quiz</Link>
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </>
          ) : (
            <>
              <Link style={styles.link} to="/login">Login</Link>
              <Link style={styles.link} to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    padding: "1rem 2rem",
    background: "#282c34",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "1rem"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  button: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer"
  }
};

export default Navbar;
