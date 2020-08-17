const express = require("express");
const Router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const Follow = require("../models/follow_model");
//const jwt = require("../validator/jwtAuthenticator");
const {
  validateLoginInput,
  validateSignUpData,
  validateUpdateUserData,
  validateFollowUserData,
} = require("../validator/inputValidation");
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
            user: { ...user, accessToken: token },
            message: "logIn successfull",
          });
          // const params = {
          //   email: req.body.email,
          //   password: req.body.password,
          // };
          // User.getUserByCreds(params, (err, resUser) => {
          //   if (err) {
          //     console.error(err.msg);
          //   } else {
          //     res.json({
          //       success: true,
          //       user: resUser,
          //       msg: "logIn successfull",
          //     });
          //   }
          // });
        }
      }
    });
  }
});

Router.put("/update", (req, res) => {
  if (!req.body.profilePic) {
    const { errors, isValid, command, code } = validateUpdateUserData(req.body);
    if (!isValid) {
      res.status(400).send(errors);
    } else {
      User.getUserByEmail(req.body.email, (err, emailExisted) => {
        if (!emailExisted) {
          res.send("email doen't existed");
        } else {
          console.log(req.body);
          if (code === 1) {
            //update password
            console.log(command);
            User.updatePassword(command, (err, passupdated) => {
              if (err) {
                console.error(err.msg);
              } else {
                res.json({
                  success: true,
                  msg: "password updated successfully",
                });
              }
            });
          } else if (code === 2) {
            //update city
            User.updateCity(command, (err, cityUpdated) => {
              if (err) {
                console.error(err.msg);
              } else {
                res.json({
                  success: true,
                  msg: "city updated successfully",
                });
              }
            });
          } else if (code === 3) {
            //update name
            User.updateName(command, (err, nameupdated) => {
              if (err) {
                console.error(err.msg);
              } else {
                res.json({
                  success: true,
                  msg: "name updated successfully",
                });
              }
            });
          } else if (code === 4) {
            //update name and password
            User.updateNameAndPassword(command, (err, namePassupdated) => {
              if (err) {
                console.error(err.msg);
              } else {
                res.json({
                  success: true,
                  msg: "name and password updated successfully",
                });
              }
            });
          } else if (code === 5) {
            //update city and password
            User.updateCityAndPassword(command, (err, cityPassupdated) => {
              if (err) {
                console.error(err.msg);
              } else {
                res.json({
                  success: true,
                  msg: "city pass updated successfully",
                });
              }
            });
          } else {
            //update city and name
            User.updateNameAndCity(command, (err, cityAndNameUpdated) => {
              if (err) {
                console.error(err.msg);
              } else {
                res.json({
                  success: true,
                  msg: "city and name updated successfully",
                });
              }
            });
          }
        }
      });
    }
  }
});

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
        const followObject = {
          email: req.body.email,
          femail: req.body.femail,
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
