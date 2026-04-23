const { GoogleGenAI } = require("@google/genai");
const { asyncController } = require("../helper/asyncController");
const questionsModel = require("../model/questions.model");
const { apiResponse } = require("../helper/apiResponse");
const userModel = require("../model/user.model");
// const apiResponse = require('../helper/apiResponse');

exports.addQuestionController = asyncController(async (req, res) => {
  const { jobPosition, jobDescription, jobExperience, email } = req.body;

  const id = await userModel.findOne({ email: email });
  if (!id) {
    return apiResponse(res, 400, "User not found");
  }
  const userId = id._id;

  // 🔍 Validation
  if (!jobPosition || !jobDescription || !jobExperience) {
    return apiResponse(res, 400, "All fields are required");
  }

  // 🤖 Gemini init
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // 🧠 Prompt
  const prompt = `
Job Position: ${jobPosition}
Job Description: ${jobDescription}
Years of Experience: ${jobExperience}

Based on this information, generate ${process.env.QUESTION_COUNT} interview questions with answers.

Return strictly valid JSON:
[
  {
    "question": "...",
    "answer": "..."
  }
]

Do not include markdown or extra text.
`;

  // ⚡ Gemini call
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  // 🧹 Clean response
  let text = response.text;
  text = text.replace(/```json/g, "").replace(/```/g, "");

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    return apiResponse(res, 500, "AI response parsing failed");
  }

  // 💾 Save to DB
  const saved = await new questionsModel({
    userId,
    jobPosition,
    jobDescription,
    jobExperience,
    qaList: parsed,
  }).save();

  apiResponse(res, 200, "Questions generated successfully", {
    questions: parsed,
    savedId: saved._id,
  });
});

exports.getQuestionController = asyncController(async (req, res) => {
  const question = await questionsModel.find({});

  apiResponse(res, 200, "Question found successfully", question);
});
