const jwt = require("jsonwebtoken");
const  User = require("../../models/User");

// Environment variable loader setup
require('dotenv').config();

const { genPassword, validPassword } = require("../passwordUtils");

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
    .then(() => {
      res.status(200).send({ message: "Successfully created!" });
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

      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 3600 * 24 * 7
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: "User",
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};