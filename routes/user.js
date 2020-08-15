const User = require("../models/user_model");
const express = require("express");
const Router = express.Router();
const {
  validateLoginInput,
  validateSignUpData,
  validateUpdateUserData,
} = require("../validator/inputValidation");

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
          password: req.body.password,
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
    User.getUserByEmail(req.body.email, (err, emailNotRegistered) => {
      if (!emailNotRegistered) {
        res.send("email not registered!!!!");
        return;
      } else {
        const params = {
          email: req.body.email,
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
          if (code === 1) {
            //update password
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

module.exports = Router;
