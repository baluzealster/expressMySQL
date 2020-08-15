const sql = require("./db");
const { query } = require("./db");
const User = function (user) {
  (this.name = user.name),
    (this.email = user.email),
    (this.phone = user.phone),
    (this.profilePic = user.profilePic),
    (this.date = new Date());
};

//create user in the database
User.create = (newUser, result) => {
  const params = {
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
    phone: newUser.phone,
    profilePic: newUser.profilePic,
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
  const query = `
SELECT * 
FROM users 
WHERE username=${user.username} AND password=${user.password}`;
  sql.query(query, (err, res) => {
    if (err) throw err;
    result(null, res[0]);
  });
};

User.getUserByemail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email="${email}";`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(null, res[0]);
  });
};

//Upodate user in the database
// User.updateProfilePic= (profileUpdateProfile,result)=>{
//   sql.query(`UPDATE users SET profilePic=${profilePic} WHERE username=${}`)

// }

module.exports = User;
