import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import AttemptQuiz from "./pages/AttemptQuiz";
import ProtectedRoute from "./utils/ProtectedRoute";
import GenerateQuiz from "./pages/GenerateQuiz";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/generate" element={<GenerateQuiz />} />

        <Route path="/create" element={
          <ProtectedRoute>
            <CreateQuiz />
          </ProtectedRoute>
        } />
        <Route path="/quiz/:id" element={
          <ProtectedRoute>
            <ViewQuiz />
          </ProtectedRoute>
        } />
        <Route path="/quiz/:id/edit" element={
  <ProtectedRoute>
    <CreateQuiz />
  </ProtectedRoute>
} />
        
        {/* 🟢 Publicly accessible route */}
        <Route path="/attempt/:id" element={<AttemptQuiz />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
