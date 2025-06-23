const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
