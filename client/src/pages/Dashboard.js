import React, { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("/quiz/my-quizzes");
      setQuizzes(res.data.quizzes);

      res.data.quizzes.forEach(async (quiz) => {
        try {
          const res2 = await axios.get(`/quiz/analytics/${quiz._id}`);
          setAnalytics((prev) => ({
            ...prev,
            [quiz._id]: res2.data,
          }));
        } catch (err) {
          console.error(`Error fetching analytics for quiz ${quiz._id}:`, err);
        }
      });
    } catch (err) {
      console.error("❌ Error fetching quizzes", err);
    }
  };

  const handleCreateQuiz = () => {
    navigate("/create");
  };

  const handleShare = (quizId) => {
    const link = `${window.location.origin}/attempt/${quizId}`; // ✅ FIXED route
    const shareData = {
      title: "Check out this Quiz!",
      text: "I found this awesome quiz. Give it a try!",
      url: link,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("✅ Shared successfully"))
        .catch((error) => console.error("❌ Sharing failed", error));
    } else {
      navigator.clipboard.writeText(link);
      alert("🔗 Quiz link copied to clipboard!");
    }
  };

  const handleDelete = async (quizId) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this quiz?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/quiz/${quizId}`);
      alert("🗑️ Quiz deleted successfully!");
      fetchQuizzes();
    } catch (err) {
      console.error("Failed to delete quiz:", err);
      alert("❌ Failed to delete quiz");
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>
        <div className="dashboard-buttons" style={{ display: "flex", gap: "15px" }}>
          <button className="create-btn" onClick={handleCreateQuiz}>
            ➕ Create Quiz
          </button>
          <button
            className="create-btn"
            style={{ backgroundColor: "#00cec9", color: "#000" }}
            onClick={() => navigate("/generate")}
          >
            🤖 Generate with AI
          </button>
        </div>
      </div>

      <h3>Total Quizzes Created: {quizzes.length}</h3>

      <div className="quiz-list">
        {quizzes.length === 0 ? (
          <p className="no-quizzes">😕 No quizzes found. Start by creating one!</p>
        ) : (
          quizzes.map((quiz) => (
            <div className="quiz-card" key={quiz._id}>
              <h3>{quiz.title}</h3>
              <p>🧩 {quiz.questions.length} questions</p>
              <p>
                📊 {analytics[quiz._id]?.totalAttempts || 0} attempts | Avg:{" "}
                {analytics[quiz._id]?.averageScore || 0}
              </p>
              <button
                className="view-btn"
                onClick={() => navigate(`/view-quiz/${quiz._id}`)}
              >
                👁️ View
              </button>
              <button className="share-btn" onClick={() => handleShare(quiz._id)}>
                📤 Share
              </button>
              <button className="delete-btn" onClick={() => handleDelete(quiz._id)}>
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
