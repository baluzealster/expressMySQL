const User = require("../models/user_model");
const Router = require("express").Router();
const { validateFollowUserData } = require("../validator/inputValidation");

Router.post("/follow", (req, res) => {
  const { isValid, errors } = validateFollowUserData(req.body);
  if (!isValid) {
    res.status(400).send(errors);
  } else {
    User.getUserByEmail(req.body.email, (err, emailExisted) => {
      if (!emailExisted) {
        res.json({
          success: false,
          msg: "email that you trying to follow is not exists",
        });
      } else {
      }
    });
  }
});
