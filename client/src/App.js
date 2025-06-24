import React, { useEffect } from "react"; // Added useEffect here
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate // Keep Navigate, it's used in ProtectedRoute
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import ProtectedRoute from "./utils/ProtectedRoute";
import GenerateQuiz from "./pages/GenerateQuiz";
import { isAuthenticated } from './utils/auth'; // Added import for isAuthenticated

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/attempt"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // New useEffect to handle initial root path logic
  useEffect(() => {
    // Only apply this logic when the user is at the very root path '/'
    if (location.pathname === '/') {
      if (isAuthenticated()) {
        // If authenticated, redirect to dashboard
        // Using window.location.replace to ensure a clean redirect and replace history state
        window.location.replace("/dashboard");
      } else {
        // If not authenticated, redirect to login
        window.location.replace("/login");
      }
    }
  }, [location.pathname]); // Dependency array: re-run this effect if the pathname changes

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Public quiz access */}
        <Route path="/attempt/:id" element={<AttemptQuiz />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <GenerateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-quiz/:id"
          element={
            <ProtectedRoute>
              <ViewQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:id/edit"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for any other unhandled paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
