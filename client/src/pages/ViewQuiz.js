import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api"; // ✅ Use configured axios
import "./ViewQuiz.css";

const ViewQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/quiz/${id}`); // ✅ baseURL + /quiz/:id
        setQuiz(res.data.quiz);
        setError(null);
      } catch (error) {
        console.error("❌ Error fetching quiz:", error);
        setError("Failed to load quiz. You might not have permission.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return <div className="loading">⏳ Loading quiz...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!quiz) return <div className="error">Quiz not found.</div>;

  return (
    <div className="view-quiz-container">
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, index) => (
        <div key={q._id} className="question-card">
          <h4>
            Q{index + 1}: {q.question}
          </h4>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <p className="correct-answer">✅ Answer: {q.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewQuiz;
