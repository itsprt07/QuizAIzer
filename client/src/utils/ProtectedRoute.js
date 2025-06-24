// src/utils/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, removeToken } from "./auth";
import axios from "../api"; // ✅ your axios instance (must set baseURL in it)

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null: loading, true/false: valid/invalid

  useEffect(() => {
    const validate = async () => {
      const token = getToken();
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await axios.get("/auth/validate-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setIsValid(true);
        } else {
          removeToken();
          setIsValid(false);
        }
      } catch (err) {
        console.error("❌ Token validation failed:", err);
        removeToken();
        setIsValid(false);
      }
    };

    validate();
  }, []);

  if (isValid === null) {
    return (
      <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
        🔄 Validating token...
      </div>
    );
  }

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
