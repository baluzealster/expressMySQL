const validator = require("validator");
const isEmpty = require("is-empty");
var bcrypt = require("bcryptjs");

module.exports.validateLoginInput = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(data.email)) {
    errors.message = "please enter the email addresss";
  } else if (!validator.isEmail(data.email)) {
    errors.message = "please enter valid email address";
  }
  if (validator.isEmpty(data.password)) {
    errors.message = "please enter the password";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validateSignUpData = (data) => {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.profilePic = !isEmpty(data.profilePic) ? data.profilePic : "";
  if (validator.isEmpty(data.name)) {
    errors.message = "please enter the name";
  }
  if (validator.isEmpty(data.email)) {
    errors.message = "please enter the email address";
  } else if (!validator.isEmail(data.email)) {
    errors.message = "please enter valid email address";
  }
  if (validator.isEmpty(data.password)) {
    errors.message = "please enter the password";
  }
  if (validator.isEmpty(data.city)) {
    errors.message = "please enter city name";
  }
  if (validator.isEmpty(data.profilePic)) {
    errors.message = "please select the profile pic";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validateUpdateUserData = (data) => {
  const errors = {};
  if (!isEmpty(data)) {
    errors.message = "nothing is given to update";
  } else if (!data.email) {
    errors.message = "email is must to update anything ";
  } 
  return {
    errors,
    isValid:isEmpty(errors)
  }
  }
  // const errors = {};
  // const command = [];
  // const status = {};
  // if (!data.email) {
  //   errors.message = "please add email to update your profile";
  // } else if (!data.name && !data.city && !data.password) {
  //   errors.message = "please add a field to update";
  // } else if (!data.name && !data.city) {
  //   console.log("update password");
  //   command.push({ password: data.password, email: data.email });
  //   status.code = 1;
  // } else if (!data.name && !data.password) {
  //   console.log("update city");
  //   command.push({
  //     city: data.city,
  //     email: data.email,
  //   });
  //   status.code = 2;
  // } else if (!data.password && !data.city) {
  //   console.log("update name");
  //   command.push({
  //     name: data.name,
  //     email: data.email,
  //   });
  //   status.code = 3;
  // } else if (!data.city) {
  //   console.log("update name and password");
  //   command.push({
  //     name: data.name,
  //     password: data.password,
  //     email: data.email,
  //   });
  //   status.code = 4;
  // } else if (!data.name) {
  //   console.log("update city and password");
  //   command.push({
  //     city: data.city,
  //     password: data.password,
  //     email: data.email,
  //   });
  //   status.code = 5;
  // } else if (!data.password) {
  //   console.log("update name and city");
  //   command.push({
  //     name: data.name,
  //     city: data.city,
  //     email: data.email,
  //   });
  //   status.code = 6;
  // }

  return {
    errors,
    isValid: isEmpty(errors),
    command: command[0],
    code: status.code,
  };
};

module.exports.validateFollowUserData = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.fEmail = !isEmpty(data.fEmail) ? data.fEmail : "";
  data.follow = !isEmpty(data.follow) ? data.follow : "";
  if (validator.isEmpty(data.email)) {
    errors.message = "please add email";
  } else if (!validator.isEmail(data.email)) {
    errors.message = "please add valid email";
  }

  if (validator.isEmpty(data.femail)) {
    errors.message = "please add email to follow";
  } else if (validator.isEmail(data.fEmail)) {
    errors.message = "please add valid email to follow";
  }

  if (!validator.isBoolean(data.follow)) {
    errors.message = "not a boolean";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
