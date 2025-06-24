// src/utils/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; // This should check for token

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated(); // Should return true if token is present

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
