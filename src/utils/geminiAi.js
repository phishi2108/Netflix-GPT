import { GoogleGenerativeAI } from "@google/genai";
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const generateContent = async (prompt) => {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};