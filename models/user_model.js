const sql = require("./db");
const { query } = require("./db");
const User = function (user) {
  (this.name = user.name),
    (this.email = user.email),
    (this.profilePic = user.profilePic),
    (this.password = user.password),
    (this.date = new Date());
};

//create user in the database
User.create = (newUser, result) => {
  const params = {
    name: newUser.name,
    email: newUser.email,
    city: newUser.city,
    profilePic: newUser.profilePic,
    password: newUser.password,
  };
  sql.query("INSERT INTO users SET ?", params, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    console.log(res.insertId);
    result(null, res);
  });
};

User.getUserByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email=?`, [email], (err, res) => {
    if (err) {
      console.log("error: ", err.msg);
      result(err);
      return;
    }
    console.log(res);
    result(null, res[0]);
  });
};

//Update profilePic in the database
User.updateProfilePic = (profile, result) => {
  const query = `UPDATE users SET profilePic=${profile.picture} WHERE email="${profile.email}"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.error(err.msg);
      result(err);
      return;
    }
    result(null, res);
  });
};

//update user
User.updateUser = (data, result) => {
  let query = "UPDATE users SET ";
  let passArray = [];

  Object.keys(data).forEach((key, index, array) => {
    console.log(data[key]);
    if (array[array.length - 1] === "email") {
      if (index === array.length - 2) {
        console.log(index);
        query += `${key}=?`;
        passArray.push(data[key]);
      } else if (key !== "email") {
        query += `${key}=?,`;
        passArray.push(data[key]);
      }
    } else if (key != "email") {
      if (index === array.length - 1) {
        query += `${key}=?`;
        passArray.push(data[key]);
      } else {
        query += `${key}=?,`;
        passArray.push(data[key]);
      }
    }
  });

  passArray.push(data.email);
  query = query + ` WHERE email=?`;
  sql.query(query, passArray, (err, res) => {
    if (err) {
      console.error(err.msg);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};
module.exports = User;
