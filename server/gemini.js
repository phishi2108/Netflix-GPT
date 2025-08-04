const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiResponse = async (userPrompt) => {
	const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

	const formattedPrompt = `
You are an API endpoint. Return only a raw JSON object as a response. No markdown formatting. No code blocks. No explanations.

Rules:
- Do NOT use triple backticks ("""\`\`\`""").
- Do NOT write "json" or any text before or after the JSON.
- Only return a JSON object.
- JSON must follow this structure exactly:

{
  "movie_titles": [
    "Movie Title 1",
    "Movie Title 2",
    "Movie Title 3",
    "Movie Title 4",
    "Movie Title 5"
  ]
}

Now, based on the user's request below, return exactly five movie titles in this structure:

User request: ${userPrompt}
`;

	console.log("📤 Sending to Gemini:", formattedPrompt);

	const result = await model.generateContent(formattedPrompt);
	const response = await result.response;

	let text = response.text();

	// ✂️ Remove markdown block (```json)
	text = text.replace(/```json|```/g, "").trim();

	// 🧠 Handle stringified JSON response like: '"{...}"'
	if (text.startsWith('"') && text.endsWith('"')) {
		text = JSON.parse(text); // remove outer quotes
	}

	// ✅ Parse actual JSON string to JS object
	const json = typeof text === "string" ? JSON.parse(text) : text;

	return json;
};

module.exports = getGeminiResponse;
