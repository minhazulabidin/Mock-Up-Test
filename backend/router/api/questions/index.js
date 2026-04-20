

const express = require('express');
const router = express.Router();


router.get("/allQuestions", (req, res) => {
    res.send("All Questions")
})

module.exports = router;