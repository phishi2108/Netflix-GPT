// server/index.js
const express = require("express");
const cors = require("cors");
const getGeminiResponse = require("./gemini");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;

  try {
    const reply = await getGeminiResponse(prompt);
    res.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Gemini server running at http://localhost:${PORT}`);
});
