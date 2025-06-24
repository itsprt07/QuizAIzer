import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // ✅ Hide navbar on public quiz route
  const isAttemptRoute = location.pathname.toLowerCase().startsWith("/attempt/");

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>QuizAIzer</h2>

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
    textDecoration: "none",
    cursor: "pointer"
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
