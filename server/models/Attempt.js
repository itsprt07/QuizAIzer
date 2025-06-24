// models/Attempt.js
const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true, // ✅ Correct field name
  },
  score: {
    type: Number,
    required: true, // ✅ Score must be a number
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attempt", attemptSchema);
