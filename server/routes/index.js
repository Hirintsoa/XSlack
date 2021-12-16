const express = require('express');
const router = express.Router();

const { verifySignUp } = require('../middlewares/auth/verifySignUp');
const { signin, signup } = require('../middlewares/auth/basicAuth');

router.post('/register', verifySignUp, signup);
router.post('/authenticate', signin);

module.exports = router;