const express = require('express');
const router = express.Router();

router.use("/questions", require('./questions'))
router.use("/user", require('./user'))
router.use("/webhooks", require('./webhooks'))


module.exports = router;