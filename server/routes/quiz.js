const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Attempt = require("../models/Attempt");

// ✅ Manual Quiz Creation
router.post("/create-manual", verifyToken, async (req, res) => {
  try {
    const { title, questions } = req.body;

    const quiz = new Quiz({
      user: req.user.id,
      title,
      questions,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all quizzes by user
router.get("/my-quizzes", verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id });
    res.status(200).json({ quizzes });
  } catch (err) {
    console.error("❌ Fetch Quizzes Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Protected single quiz fetch
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (quiz.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Access denied" });

    res.status(200).json({ quiz });
  } catch (err) {
    console.error("❌ Get Single Quiz Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Public quiz fetch (without correct answers)
router.get("/public/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const { title, questions } = quiz;
    res.status(200).json({ quiz: { title, questions } });
  } catch (err) {
    console.error("❌ Public Quiz Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete quiz
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (quiz.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Unauthorized" });

    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Quiz Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Save quiz attempt
router.post("/attempt/:id", async (req, res) => {
  try {
    const { score } = req.body;
    const quizId = req.params.id;

    if (typeof score !== "number" || score < 0)
      return res.status(400).json({ message: "Invalid score value" });

    const quizExists = await Quiz.exists({ _id: quizId });
    if (!quizExists) return res.status(404).json({ message: "Quiz not found" });

    const attempt = new Attempt({
      quiz: quizId, // ✅ Fix here: not quizId, it's quiz
      score,
    });

    await attempt.save();
    res.status(201).json({ message: "Attempt saved" });
  } catch (err) {
    console.error("❌ Attempt Save Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Analytics
router.get("/analytics/:id", async (req, res) => {
  try {
    const quizExists = await Quiz.exists({ _id: req.params.id });
    if (!quizExists) return res.status(404).json({ message: "Quiz not found" });

    const attempts = await Attempt.find({ quiz: req.params.id });

    const totalAttempts = attempts.length;
    const averageScore = totalAttempts
      ? attempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts
      : 0;

    res.status(200).json({ totalAttempts, averageScore });
  } catch (err) {
    console.error("❌ Analytics Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
