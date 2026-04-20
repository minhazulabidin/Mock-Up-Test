const express = require('express');
const { addQuestionController } = require('../../../controller/Questions.controller');
const router = express.Router();


router.post('/allQuestions', addQuestionController)

module.exports = router;