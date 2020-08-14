const sql = require("./db");
const { query } = require("./db");
const User = function (user) {
  (this.name = user.name),
    (this.email = user.email),
    (this.phone = user.phone),
    (this.profilePic = user.profilePic);
};

User.create = (newUser, result) => {
  query = {
    name: newUser.name,
    email: newUser.email,
  };
  sql.query("INSERT INTO users SET ?", query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};
