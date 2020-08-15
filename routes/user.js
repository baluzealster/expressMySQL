const User = require("../models/user.model");
const express = require("express");
const Router = express.Router();

Router.post("/register", (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.profilePic ||
    !req.body.phone
  ) {
    res.status(400).send("please fill all details");
  } else {
    User.getUserByemail(req.body.email, (err, existingEmail) => {
      if (existingEmail) {
        res.json({
          success: false,
          msg: "email already exists",
        });
      } else {
        const user = {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          profilePic: req.body.profilePic,
          phone: req.body.phone,
          email: req.body.email,
        };
        User.create(user, (err, resUser) => {
          if (err) {
            console.error(err.msg);
          }
          console.log(resUser);
          res.json({
            success: true,
            msg: "user added successfully",
          });
        });
      }
    });
  }
});

module.exports = Router;
