const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.get('/:email', (req, res) => {
    User.findOne(req.params.email)
        .then(user => (user) ? res.send(user):res.status(404).send({ error: "User not found" }))
        .catch(error => res.send(error));
});

router.post('/edit', (req, res) => {
    User.update();
});

module.exports = router;