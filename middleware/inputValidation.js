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
    isValid: isEmpty(errors),
  };
};

module.exports.validateFollowUserData = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.followEmail = !isEmpty(data.followEmail) ? data.followEmail : "";
  data.follow = !isEmpty(data.follow) ? data.follow : "";
  if (validator.isEmpty(data.email)) {
    errors.message = "please add email";
  } else if (!validator.isEmail(data.email)) {
    errors.message = "please add valid email";
  }

  if (validator.isEmpty(data.followEmail)) {
    errors.message = "please add email to follow";
  } else if (validator.isEmail(data.followEmail)) {
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
