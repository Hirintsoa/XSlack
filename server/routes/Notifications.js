const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth/authJwt');
const { Notification } = require('../models');

router.use(verifyToken);

router.get('/:id', (req, res) => {
    Notification.findOne(req.params.id)
        .then(notif => {
            if(!notif){
                return res.status(404).send({ error: "Notification not found" });
            }
            return (req.userMail !== notif.owner) ? res.status(403):res.send(notif);
        })
        .catch(error => res.send({error: error.name}));
});

router.post('/', (req, res) => {
    let { title, content, owner } = req.body;
    let incomingNotification = { title, content, owner };
    incomingNotification.type = req.body.type || null;

    let newNotification = Notification.build(incomingNotification);
    newNotification.save()
        .then(() => res.status(201).send({ message: "Item created successfully" }))
        .catch(error => res.status(500).send({ error: error.name }));
});

router.patch('/:id', (req, res) => {
    Notification.findByPk(req.params.id)
        .then(notif => {
            if (notif.owner !== req.userMail) return res.status(403);

            Notification.update();
        })
});

module.exports = router;