const sql = require("../models/db");
const User = require("./user_model");
const Follow = function (data) {
  (this.email = data.email), (this.follow = data.follow);
};

Follow.followUser = (data, result) => {
  const query = `INSERT INTO followers SET email=?, femail=?`;
  sql.query(query, [data.email, data.femail], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    if (res) {
      const followCountA = this.getFollowCount(data.email);
      const followCountB = this.getFollowCount(data.femail);
      console.log(followCountA);
      this.updateUserRecord({ email: data.email, followCountA });
      this.updateUserRecord({ email: data.femail, followCountB });
    }
    result(null, res);
  });
};

Follow.updateUserRecord = (data, result) => {
  const query = `INSERT INTO users SET follower=? following=? WHERE email="${data.email}"`;
  sql.query(query, [data.follower, data.following], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    return res;
  });
};

Follow.getFollowCount = (email, result) => {
  const query = `SELECT t1.follower, t2.following FROM
    (SELECT count(email) AS following FROM followers WHERE email="${email}") AS t1,
    (SELECT count(femail) AS  follower FROM followers WHERE femail="${email}") AS t2;`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    return res;
  });
};
module.exports = Follow;
