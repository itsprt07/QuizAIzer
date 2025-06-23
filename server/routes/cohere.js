const express = require("express");
const router = express.Router();
const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);

router.post("/generate", async (req, res) => {
  const { paragraph, isFollowUp } = req.body;

  const prompt = `
Create ${isFollowUp ? "1-2" : "4"} multiple choice questions from this paragraph:

${paragraph}

Each question should have 4 options labeled A to D. Clearly mention the correct answer after each question using this format:

Answer: B

${!isFollowUp ? 'If you can generate more questions, ask: "Want to add more questions?"' : ""}
`;

  try {
    const response = await cohere.generate({
      model: "command",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const output = response.body.generations[0].text.trim();
    res.json({ success: true, data: output });
  } catch (error) {
    console.error("❌ Cohere generation error:", error);
    res.status(500).json({ success: false, message: "Failed to generate quiz." });
  }
});

module.exports = router;
