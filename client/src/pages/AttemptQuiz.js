import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AttemptQuiz.css";

const AttemptQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `https://quizaizer-backend.onrender.com/api/quiz/public/${id}`
        );
        setQuiz(res.data.quiz);
        setError("");
      } catch (err) {
        console.error("❌ Failed to fetch quiz:", err);
        setError("Quiz not found or inaccessible.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sc = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx]?.trim() === q.correctAnswer?.trim()) {
        sc++;
      }
    });
    setScore(sc);
    setSubmitted(true);

    // Save anonymous attempt
    try {
      await axios.post(
        `https://quizaizer-backend.onrender.com/api/quiz/attempt/${id}`,
        { score: sc }
      );
    } catch (err) {
      console.error("❌ Error saving attempt:", err);
    }
  };

  if (loading) {
    return <div className="attempt-quiz-bg">⏳ Loading quiz...</div>;
  }

  if (error) {
    return <div className="attempt-quiz-bg error">{error}</div>;
  }

  if (!quiz) {
    return <div className="attempt-quiz-bg">❌ Quiz not found.</div>;
  }

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
                <p
                  className={
                    answers[i] === q.correctAnswer ? "correct" : "wrong"
                  }
                >
                  ✅ Correct Answer: {q.correctAnswer}
                </p>
              )}
            </div>
          ))}

          {!submitted ? (
            <button type="submit" className="btn submit">🚀 Submit Quiz</button>
          ) : (
            <div className="score">
              🎯 You scored <strong>{score}</strong> out of {quiz.questions.length}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AttemptQuiz;
