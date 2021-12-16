const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { verifyToken } = require('../middlewares/auth/authJwt');
const { Message } = require('../models');

router.use(verifyToken);

router.get('/:participant/all', (req, res) => {
    let {participant} = req.params;

    if(participant === req.userMail) {
      Message.findAll({
        where: {
            [Op.or]: [
              { sender: participant },
              { recipient: participant }
            ]
        },
        attributes: { exclude: ['updated_at'] }
      }).then(messages => res.send(messages))
        .catch(error => res.status(500).send({ error }));
    }
    else {
        res.status(403).send({ error: "Current user cannot process this task" });
    }
    
});

router.get('/:emitter/:receiver', (req, res) => {
    let { emitter, receiver } = req.params;
    Message.findAll({
        where: {
            [Op.and]: [
              { sender: emitter },
              { recipient: receiver }
            ]
        },
        attributes: { exclude: ['updated_at'] }
    }).then(messages => res.send(messages))
      .catch(error => res.status(500).send({ error }));
});

router.get('/conversations/:user1/:user2', (req, res) => {
  let { user1, user2 } = req.params;
  Message.findAll({
      where: {
          [Op.and]: [
            {
              sender: { [Op.or]: [user1, user2] }  
            },
            {
              recipient: { [Op.or]: [user1, user2] }
            }
          ]
      },
      attributes: { exclude: ['updated_at'] }
  }).then(messages => res.send(messages))
    .catch(error => res.status(500).send({ error }));
});

router.post('/', (req, res) => {
  let { content, sender, recipient } = req.body;
  console.info(sender, req.userMail)

  if(sender === req.userMail) {
    let newMessage = Message.build({ content, sender, recipient });
    newMessage.save()
        .then(item => res.status(201).send(item))
        .catch(error => res.status(500).send({ error: error.name }));
  }
  else {
    res.status(403).send({ error: "Current user cannot process this task" });
  }
});

module.exports = router;