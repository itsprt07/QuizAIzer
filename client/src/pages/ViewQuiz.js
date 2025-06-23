// src/pages/ViewQuiz.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/auth";
import "./ViewQuiz.css";

const ViewQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`http://localhost:5000/api/quiz/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuiz(res.data.quiz);
      } catch (error) {
        console.error("❌ Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div className="loading">⏳ Loading quiz...</div>;
  }

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
