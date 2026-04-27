const { GoogleGenAI } = require("@google/genai");
const { asyncController } = require("../helper/asyncController");
const questionsModel = require("../model/questions.model");
const { apiResponse } = require("../helper/apiResponse");
const userModel = require("../model/user.model");

exports.addQuestionController = asyncController(async (req, res) => {
  const { jobPosition, jobDescription, jobExperience, email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  if (!jobPosition || !jobDescription || !jobExperience) {
    throw new Error("All fields are required");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
Job Position: ${jobPosition}
Job Description: ${jobDescription}
Years of Experience: ${jobExperience}

Based on this information, generate ${process.env.QUESTION_COUNT || 5} interview questions with answers.

Return strictly valid JSON:
[
  {
    "question": "...",
    "answer": "..."
  }
]

Do not include markdown or extra text.
`;

  let response;

  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // stable model
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
  } catch (err) {
    throw new Error("AI generation failed: " + err.message);
  }

  let text = response.text;

  // clean markdown
  text = text.replace(/```json/g, "").replace(/```/g, "");

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error("AI response parsing failed");
  }

  const saved = await new questionsModel({
    userId: user._id,
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
