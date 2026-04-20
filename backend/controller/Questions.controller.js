const { apiResponse } = require("../helper/apiResponse");
const { asyncController } = require("../helper/asyncController");
const questionsModel = require("../model/questions.model");

exports.addQuestionController = asyncController(async (req, res) => {
    const { userId, jobPosition, jobDescription, jobExperience } = req.body;
    if (!jobPosition || !jobDescription || !jobExperience) {
        apiResponse(res, 400, "All fields are required");
    } else {
        // const questions = await questionsModel.
    }
})