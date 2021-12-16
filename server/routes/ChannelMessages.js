const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { verifyToken } = require('../middlewares/auth/authJwt');
const { ChannelMessage } = require('../models');

router.use(verifyToken);

router.get('/:emitter/all', (req, res) => {
    let {emitter} = req.params;

    if (emitter === req.userMail) {
        ChannelMessage.findAll({
            where: { recipient: emitter },
            attributes: { exclude: ['updated_at'] }
        }).then(messages => res.send(messages))
        .catch(error => res.status(500).send({ error }));
    } else {
        res.status(403).send("User does not have access to this data");
    }
});

router.get('/:channelId/:emitter', (req, res) => {
    let { emitter, channelId } = req.params;

    if (emitter === req.userMail && req.channelList.includes(channelId)) {
        ChannelMessage.findAll({
            where: {
                [Op.and]: [
                    { sender: emitter },
                    { recipient: channelId }
                ]
            },
            attributes: { exclude: ['updated_at'] }
        }).then(messages => res.send(messages))
          .catch(error => res.status(500).send({ error }));
    } else {
        res.status(403).send("User does not have access to this data");
    }
});

router.post('/', (req, res) => {
    let { content, sender, recipient } = req.body;

    if (sender === req.userMail && req.channelList.includes(recipient)) {
        let newMessage = ChannelMessage.build({ content, sender, recipient });
        newMessage.save()
            .then(() => res.status(201).send({ message: "Item created successfully" }))
            .catch(error => res.status(500).send({ error: error.name }));
    } else {
        res.status(403).send("Forbidden action");
    }
});

module.exports = router;