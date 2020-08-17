const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET } = require("../config/config");

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message:
        "no access token provided. Please add x-access-token in the header to get the access",
    });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unAuthorised" });
    }
    req.userId = decoded.id;
    next();
  });
};
