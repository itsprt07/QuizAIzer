// src/pages/GenerateQuiz.js

import React, { useState } from "react";
import axios from "axios";

const GenerateQuiz = () => {
  const [paragraph, setParagraph] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [followupActive, setFollowupActive] = useState(false);

  const generateQuiz = async () => {
    if (paragraph.trim().length < 30) {
      setError("Please enter a longer paragraph (at least 30 characters).");
      return;
    }

    setLoading(true);
    setError("");
    setQuiz("");
    setFollowupActive(false);

    try {
      const res = await axios.post("http://localhost:5000/api/cohere/generate", {
        paragraph,
        isFollowUp: false, // Initial request
      });

      const response = res.data.data || "No quiz generated";
      setQuiz(response);

      if (response.toLowerCase().includes("add more questions")) {
        setFollowupActive(true);
      }
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserReply = async (reply) => {
    if (reply === "No") {
      setFollowupActive(false);
      return;
    }

    setLoading(true);
    setFollowupActive(false);

    try {
      const res = await axios.post("http://localhost:5000/api/cohere/generate", {
        paragraph,
        isFollowUp: true, // Follow-up request
      });

      const response = res.data.data || "No further response";
      setQuiz((prev) => `${prev}\n\n${response}`);

      if (response.toLowerCase().includes("add more questions")) {
        setFollowupActive(true);
      }
    } catch (err) {
      setError("Failed to continue conversation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-container" style={{ padding: "30px", color: "#fff" }}>
      <h2>🧠 AI Quiz Generator</h2>

      <textarea
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        rows="8"
        style={{
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          width: "60%",
          resize: "both",
          overflow: "auto",
          borderRadius: "8px",
          backgroundColor: "#eaeaea",
          color: "#000000",
          border: "1px solid #ccc",
        }}
        placeholder="Paste your paragraph here..."
      />

      <br />
      <button
        onClick={generateQuiz}
        style={{
          padding: "12px 24px",
          backgroundColor: "#00cec9",
          color: "#000",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {error && <p style={{ color: "#ff7675", marginTop: "20px" }}>{error}</p>}

      {quiz && (
        <div
          style={{
            marginTop: "30px",
            whiteSpace: "pre-wrap",
            backgroundColor: "#2d3436",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>📘 Generated Quiz:</h3>
          <p>{quiz}</p>
        </div>
      )}

      {followupActive && (
        <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
          <button
            onClick={() => handleUserReply("Yes")}
            style={{
              padding: "10px 18px",
              backgroundColor: "#55efc4",
              color: "#000",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✅ Yes
          </button>
          <button
            onClick={() => handleUserReply("No")}
            style={{
              padding: "10px 18px",
              backgroundColor: "#fab1a0",
              color: "#000",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ❌ No
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateQuiz;
