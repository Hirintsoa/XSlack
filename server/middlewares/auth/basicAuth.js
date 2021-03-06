const jwt = require("jsonwebtoken");
const { User, ChannelUser } = require("../../models");

// Environment variable loader setup
require('dotenv').config();

const { genPassword, validPassword } = require("../../utils/passwordUtils");

/**
 * Middleware in charge of user's subscription
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = (req, res) => {
    let {hash: password, salt} = genPassword(req.body.password);
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password,
      salt
    }

    User.create(newUser)
      .then(user => {
        let payload = {
          userMail: user.email,
          channelsList: []
        }

        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 3600 * 24 * 7
        });

        let newGeneralMember = ChannelUser.build({ UserEmail: user.email, ChannelId: 1 });
        newGeneralMember.save()
          .then(() => res.status(200).send({
                                            username: user.username,
                                            email: user.email,
                                            roles: "User",
                                            accessToken: token
                                          })
          )
          .catch(err => {
              res.status(500).send({ message: err.message });
          });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
};

/**
 * Middleware in charge of user's logs
 * @param {*} req 
 * @param {*} res 
 */
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      console.info(user);
      var passwordIsValid = validPassword(
        req.body.password,
        user.password,
        user.salt
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let payload = {
        userMail: user.email,
        channelsList: [ChannelUser.findAll({
          where: { UserEmail: user.email },
          attributes: [ 'ChannelId' ]
        })]
      }

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600 * 24 * 7
      });

      res.status(200).send({
        username: user.username,
        email: user.email,
        roles: "User",
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.name });
    });
};