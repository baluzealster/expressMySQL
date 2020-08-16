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
    result(null, res);
  });
};

//get the user from the database on logIn
User.getUserByCreds = (user, result) => {
  const query = `SELECT * FROM users WHERE email="${user.email}" AND password="${user.password}";`;
  sql.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    result(null, res);
  });
};

User.getUserByEmail = (email, result) => {
  sql.query(`SELECT email FROM users WHERE email="${email}";`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};

//Update profilePic in the database
User.updateProfilePic = (profile, result) => {
  const query = `UPDATE users SET profilePic=${profile.picture} WHERE email="${profile.email}"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.error(err.msg);
      return;
    }
    result(null, res);
  });
};

//Update name in the database
User.updateName = (profile, result) => {
  const query = `UPDATE users SET  name=? WHERE email =?`;
  console.log(query);
  sql.query(query, [profile.name, profile.email], (err, res) => {
    if (err) {
      console.error(err.message);
      return;
    }
    result(null, res);
  });
};

//Update password in the database

User.updatePassword = (profile, result) => {
  console.log(profile);
  const query = `UPDATE users SET password=? WHERE email=?`;
  sql.query(query, [profile.password, profile.email], (err, res) => {
    if (err) {
      console.log(err.message);
      return;
    }
    result(null, res);
  });
};

//Update city
User.updateCity = (profile, result) => {
  const query = `UPDATE users SET city=? WHERE email=?`;
  sql.query(query, [profile.city, profile.email], (err, res) => {
    if (err) {
      console.log(err.message);
      return;
    }
    result(null, res);
  });
};

//update name and password
User.updateNameAndPassword = (profile, result) => {
  const query = `UPDATE users SET name=?, password=? WHERE email=?`;
  sql.query(
    query,
    [profile.name, profile.password, profile.email],
    (err, res) => {
      if (err) {
        console.log(err.message);
        return;
      }
      result(null, res);
    }
  );
};

//update name and city
User.updateNameAndCity = (profile, result) => {
  const query = `UPDATE users SET name=?, city=? WHERE email=?`;
  sql.query(query, [profile.name, profile.city, profile.email], (err, res) => {
    if (err) {
      console.log(err.message);
      return;
    }
    result(null, res);
  });
};

//update city and password
User.updateCityAndPassword = (profile, result) => {
  const query = `UPDATE users SET city=?, password=? WHERE email=?`;
  sql.query(
    query,
    [profile.city, profile.password, profile.email],
    (err, res) => {
      if (err) {
        console.log(err.message);
        return;
      }
      result(null, res);
    }
  );
};
module.exports = User;
