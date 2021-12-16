const jwt = require("jsonwebtoken");

/**
 * MIDDLEWARE
 * Check if JWT token is valid and attach informations to the incoming request
 */
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!"});
    }
    req.userMail = decoded.userMail;
    req.channelList = decoded.channelList;
    next();
  });
};

module.exports.verifyToken = verifyToken;