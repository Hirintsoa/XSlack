const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth/authJwt');
const { Invitation } = require('../models');

router.use(verifyToken);

router.get('/:id', (req, res) => {
    Invitation.findOne(req.params.id)
        .then(invitation => {
            if (!invitation) return res.status(404).send({ error: "Invitation not found" });

            if(invitation.initiator === req.userMail || invitation.guest === req.userMail) return res.send(invitation);
            return res.status(403).send({ error: "This data does not concern the current user" });
        })
        .catch(error => res.status(500).send({error: error.name}));
});

router.post('/', (req, res) => {
    let { initiator, guest, channel } = req.body;

    if((req.userMail !== initiator && req.userMail !== guest) || !req.channelList.contains(channel)) return res.status(403);
    let newInvitation = Invitation.build({ initiator, guest, channel });
    newInvitation.save()
        .then(() => res.status(201).send({ message: "Item created successfully" }))
        .catch(error => res.status(500).send({ error: error.name }));
});

router.post('/edit', (req, res) => {
    Invitation.update();
});

module.exports = router;