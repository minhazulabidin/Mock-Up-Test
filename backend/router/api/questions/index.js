const express = require('express');
const { addQuestionController } = require('../../../controller/Questions.controller');
const router = express.Router();


router.get('/allQuestions',addQuestionController)

module.exports = router;