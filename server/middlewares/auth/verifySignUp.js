const { User } = require("../../models");

module.exports.verifySignUp = (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({ message: "Email is already in use!" });
        return;
      }

      User.findOne({
        where: {
          username: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({ message: "Username is already in use!" });
          return;
        }
        next();
      });
    });
};