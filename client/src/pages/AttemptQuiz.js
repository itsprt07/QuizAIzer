// src/pages/AttemptQuiz.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AttemptQuiz.css";
import { getToken } from "../utils/auth";

const AttemptQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = getToken(); // May be null for public access
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const res = await axios.get(`http://localhost:5000/api/quiz/${id}`, config);
        setQuiz(res.data.quiz);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionChange = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sc = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) sc++;
    });
    setScore(sc);
    setSubmitted(true);

    // ✅ Save anonymous attempt score
    try {
      await axios.post(`http://localhost:5000/api/quiz/attempt/${id}`, { score: sc });
    } catch (err) {
      console.error("❌ Error saving attempt:", err);
    }
  };

  if (!quiz) return <div className="attempt-quiz-bg">Loading quiz...</div>;

  return (
    <div className="attempt-quiz-bg">
      <div className="attempt-quiz-container">
        <h2>🧠 {quiz.title}</h2>
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, i) => (
            <div key={i} className="question-block">
              <h4>{i + 1}. {q.question}</h4>
              {q.options.map((opt, j) => (
                <label key={j} className="option-label">
                  <input
                    type="radio"
                    name={`question-${i}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={() => handleOptionChange(i, opt)}
                    disabled={submitted}
                  />
                  {opt}
                </label>
              ))}
              {submitted && (
                <p className={answers[i] === q.correctAnswer ? "correct" : "wrong"}>
                  Correct Answer: {q.correctAnswer}
                </p>
              )}
            </div>
          ))}
          {!submitted && <button type="submit" className="btn submit">🚀 Submit Quiz</button>}
          {submitted && <div className="score">✅ You scored {score} / {quiz.questions.length}</div>}
        </form>
      </div>
    </div>
  );
};

export default AttemptQuiz;
