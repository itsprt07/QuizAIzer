// src/utils/ProtectedRoute.js

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  // Redirect to login and preserve the current location for redirect after login
  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
