// src/pages/CreateQuiz.js

import React, { useState } from "react";
import axios from "../api";
import "./CreateQuiz.css";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question" || field === "correctAnswer") {
      updatedQuestions[index][field] = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/quiz/create-manual", {
        title,
        questions,
      });

      alert("✅ Quiz created successfully!");
      navigate(`/view-quiz/${res.data.quiz._id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create quiz");
    }
  };

  return (
    <div className="create-quiz-bg">
      <div className="create-quiz-container">
        <h2>Create a New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {questions.map((q, index) => (
            <div key={index} className="question-block">
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                required
              />
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleQuestionChange(index, i, e.target.value)
                  }
                  required
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
                required
              />
            </div>
          ))}

          <button type="button" onClick={addQuestion} className="btn add">
            ➕ Add Question
          </button>
          <button type="submit" className="btn submit">
            🚀 Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;

