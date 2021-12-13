const express = require('express');
const { signin, signup } = require('../utils/auth/basicAuth');
const router = express.Router();

router.post('/register', signup);
router.post('/authenticate', signin);

module.exports = router;