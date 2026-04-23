const express = require('express');
const router = express.Router();
const { addQuestionController ,getQuestionController} = require('../../../controller/Questions.controller');


router.post('/addQuestions', addQuestionController)
router.get('/getQuestions', getQuestionController)

module.exports = router;