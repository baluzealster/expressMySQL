const User = require("../models/user_model");
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
    User.getUserByEmail(req.body.email, (err, existingEmail) => {
      console.log(existingEmail);
      if (existingEmail) {
        res.json({
          success: false,
          msg: "email already exists",
        });
      } else {
        const userObject = {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          profilePic: req.body.profilePic,
          phone: req.body.phone,
          email: req.body.email,
        };
        User.create(userObject, (err, resUser) => {
          if (err) {
            console.error(err.msg);
          }
          res.json({
            success: true,
            msg: "user added successfully",
          });
        });
      }
    });
  }
});

Router.get("/login", (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    console.log("please fill all the details");
  } else {
    User.getUserByEmail(req.body.email, (err, emailNotRegistered) => {
      console.log(emailNotRegistered);
      if (!emailNotRegistered) {
        res.send("email not registered!!!!");
        return;
      } else {
        const params = {
          username: req.body.username,
          password: req.body.password,
        };
        User.getUserByCreds(params, (err, resUser) => {
          if (err) {
            console.error(err.msg);
          } else {
            res.json({
              success: true,
              msg: "logIn successfull",
            });
          }
        });
      }
    });
  }
});

module.exports = Router;
