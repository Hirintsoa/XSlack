const express = require('express');
const ChannelController = require('../controllers/Channel');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth/authJwt');
const { Channel } = require('../models');

router.use(verifyToken);

router.get('/:id', (req, res) => {
    Channel.findOne(req.params.id)
        .then(channel => (channel) ? res.send(channel):res.status(404).send({ error: "Channel not found" }))
        .catch(error => res.send({error: error.name}));
});

router.post('/', (req, res) => {
    let { title, description, creator } = req.body;
    if(creator === req.userMail) {
        let controller = new ChannelController();
        let { status, message } = controller.createNewChannel({ title, description, creator });
        controller = null;
        return res.status(status).send(message);
    }
    else {
        res.status(403).send({ error: "Current user cannot process this task" });
    }
});

router.post('/edit', (req, res) => {
    Channel.update();
});

router.get('/:id/users', (req, res) => {
    let controller = new ChannelController();
    let { status, message } = controller.findChannelUsers(req.params.id);
    controller = null;
    return res.status(status).send(message);
})

module.exports = router;