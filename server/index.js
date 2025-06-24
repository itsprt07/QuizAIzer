const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ Explicit CORS Configuration
const corsOptions = {
    origin: 'https://quiz-aizer.vercel.app', // ✅ YOUR VERCEl FRONTEND DOMAIN
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
    credentials: true, // Allow cookies, authorization headers, etc.
    optionsSuccessStatus: 204 // For preflight requests
};
app.use(cors(corsOptions)); // ✅ Use CORS with explicit options

app.use(express.json());

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const cohereRoutes = require("./routes/cohere");

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/cohere", cohereRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Basic API Test
app.get("/", (req, res) => {
  res.send("🚀 QuizForge Backend is Live with Explicit CORS!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});