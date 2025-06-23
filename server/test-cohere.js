const cohere = require("cohere-ai");
require("dotenv").config(); // Load .env first!


cohere.init(process.env.COHERE_API_KEY); // Use key from .env

async function test() {
  try {
    const prompt = `Generate one MCQ from the paragraph and clearly mention the correct answer.

Paragraph: The sun is the primary source of energy for all life on Earth.

Format:
1. Question?
A) Option
B) Option
C) Option
D) Option
Answer: B`;

    const response = await cohere.generate({
      model: "command-xlarge",
      prompt,
      max_tokens: 300,
      temperature: 0.5,
    });

    console.log("🔥 Raw response:");
    console.log(response.body);
  } catch (err) {
    console.error("❌ ERROR from Cohere:", err);
  }
}

test();
