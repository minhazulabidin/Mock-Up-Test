const express = require('express');
const { addQuestionController } = require('../../../controller/Questions.controller');
const router = express.Router();


router.post('/addQuestions', addQuestionController)

module.exports = router;