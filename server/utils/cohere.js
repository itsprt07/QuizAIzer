require("dotenv").config();
const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);

async function generateQuizFromText(paragraph) {
  const isFollowUp = paragraph.trim().toLowerCase() === "yes";

  const prompt = isFollowUp
    ? `Generate 5 more multiple choice questions from the same paragraph provided earlier. Format each question clearly with 4 options and indicate the correct answer.`
    : `Create at least 7 multiple choice questions from this paragraph:

${paragraph}

Each question should have 4 options labeled A to D. Clearly mention the correct answer after each question using this format:

Answer: B

If you can generate more questions, you may ask: "Want to add more questions?"`;

  try {
    console.log("📤 Prompt to Cohere:\n", prompt);

    const response = await cohere.generate({
      model: "command-xlarge",
      prompt,
      max_tokens: 800,
      temperature: 0.5,
    });

    const text = response.body.generations?.[0]?.text;
    console.log("✅ Cohere response:\n", text);

    if (!text || text.trim().length < 5) {
      throw new Error("No quiz generated. Empty response from Cohere.");
    }

    return text.trim();
  } catch (err) {
    console.error("❌ Cohere API error:", err.message);
    throw err;
  }
}

module.exports = generateQuizFromText;
