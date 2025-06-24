// src/utils/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, removeToken } from "./auth";
import axios from "../api"; // <-- use your axios instance

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validate = async () => {
      const token = getToken();
      if (!token) return setIsValid(false);

      try {
        await axios.get("/auth/validate-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsValid(true);
      } catch (err) {
        console.error("❌ Invalid token, logging out");
        removeToken();
        setIsValid(false);
      }
    };

    validate();
  }, []);

  if (isValid === null) return <div>🔄 Loading...</div>; // avoid flicker or crash

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
