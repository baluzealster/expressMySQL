const express = require("express");
const Router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const Follow = require("../models/follow_model");
const { verifyToken } = require("../middleware/jwtAuthenticator");
const {
  validateLoginInput,
  validateSignUpData,
  validateUpdateUserData,
  validateFollowUserData,
} = require("../middleware/inputValidation");
const { SECRET } = require("../config/config");

Router.post("/register", (req, res) => {
  const { errors, isValid } = validateSignUpData(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  } else {
    User.getUserByEmail(req.body.email, (err, existingEmail) => {
      if (existingEmail) {
        res.json({
          success: false,
          msg: "email already exists",
        });
      } else {
        const userObject = {
          name: req.body.name,
          city: req.body.city,
          password: bcrypt.hashSync(req.body.password, 8),
          profilePic: req.body.profilePic,
          email: req.body.email,
        };
        User.create(userObject, (err, resUser) => {
          if (err) {
            console.error(err.msg);
          }
          res.json({
            success: true,
            msg: "user added successfully",
            note: "please login using credentials",
          });
        });
      }
    });
  }
});

Router.get("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).send(errors);
  } else {
    User.getUserByEmail(req.body.email, (err, user) => {
      if (!user) {
        res.send("email not registered!!!!");
        return;
      } else {
        console.log("password", user.password);
        const validatePassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!validatePassword) {
          res
            .status(401)
            .send({ accessToken: null, message: "password is incorrect!!!" });
        } else {
          const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: 86400 });
          delete user.password;
          res.json({
            success: true,
            message: "logIn successfull",
            accessToken: token,
          });
        }
      }
    });
  }
});

Router.put("/update", verifyToken, (req, res) => {
  if (!req.body.profilePic) {
    const { errors, isValid } = validateUpdateUserData(req.body);
    if (!isValid) {
      res.status(400).send(errors);
    } else {
      User.getUserByEmail(req.body.email, (err, emailExisted) => {
        if (!emailExisted) {
          res.send("email doesn't existed");
        } else {
          //console.log(req.body);
          User.updateUser(req.body, (err, updated) => {
            if (err) {
              console.log("error: ", err.message);
              return res.send(err);
            }
            res.json({
              success: true,
              msg: "user updated",
            });
          });
        }
      });
    }
  }
});

Router.post("/follow", verifyToken, (req, res) => {
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
        const followObject = {
          email: req.body.email,
          followEmail: req.body.followEmail,
        };
        Follow.getFollowByEmailId(followObject, (err, followExists) => {
          if (followExists) {
            console.log(followExists);
            res.status(400).send("users already followed");
          } else {
            Follow.followUser(followObject, (err, followUser) => {
              if (err) {
                console.log("error: ", err);
                res.send(err);
              }
              res.json({
                success: true,
                msg: "follow successfull",
              });
            });
          }
        });
      }
    });
  }
});

module.exports = Router;
