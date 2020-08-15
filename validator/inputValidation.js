const validator = require("validator");
const isEmpty = require("is-empty");

module.exports.validateLoginInput = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(data.email)) {
    errors.name = "please enter the email addresss";
  } else if (!validator.isEmail(data.email)) {
    errors.name = "please enter valid email address";
  }
  if (validator.isEmpty(data.password)) {
    errors.name = "please enter the password";
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
    errors.name = "please enter the name";
  }
  if (validator.isEmpty(data.email)) {
    errors.name = "please enter the email address";
  } else if (!validator.isEmail(data.email)) {
    errors.name = "please enter valid email address";
  }
  if (validator.isEmpty(data.password)) {
    errors.name = "please enter the password";
  }
  if (validator.isEmpty(data.city)) {
    errors.name = "please enter city name";
  }
  if (validator.isEmpty(data.profilePic)) {
    errors.name = "please select the profile pic";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.validateUpdateUserData = (data) => {
  const errors = {};
  const command = [];
  const status = {};
  if (!data.email) {
    errors.name = "please add email to update your profile";
  } else if (!data.name || !data.city || !data.password) {
    errors.name = "please add a field to update";
  } else if (!data.name && !data.city) {
    console.log("update password");
    command.push({ password: data.password, email: data.email });
    status.code = 1;
  } else if (!data.name && !data.password) {
    console.log("update city");
    command.push({
      city: data.city,
      email: data.email,
    });
    status.code = 2;
  } else if (!data.password && !data.city) {
    console.log("update name");
    command.push({
      name: data.name,
      email: data.email,
    });
    status.code = 3;
  } else if (!data.city) {
    console.log("update name and password");
    command.push({
      name: data.name,
      password: data.password,
      email: data.email,
    });
    status.code = 4;
  } else if (!data.name) {
    console.log("update city and password");
    command.push({
      city: data.city,
      password: data.password,
      email: email,
    });
    status.code = 5;
  } else if (!data.password) {
    log("update name and city");
    command.push({
      name: data.name,
      city: data.city,
      email: data.email,
    });
    status.code = 6;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    command,
    code: status.code,
  };
};
