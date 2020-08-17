const { response } = require("express");
const sql = require("./db");
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
      console.log(res);
      let response = [];
      Object.keys(data).forEach((key, index) => {
        console.log("data: ", data[key]);
        Follow.getFollowCount(data[key], (err, followData) => {
          if (err) {
            result(err, null);
          }
          if (followData) {
            console.log("followdata: ", followData);
            response.push(
              Follow.updateUserRecord(followData, (err, updatedUser) => {
                if (err) {
                  return err;
                }
                return;
              })
            );
          }
        });
      });
    }
    console.log("response: ", response);
    result(null, response);
  });
};

Follow.updateUserRecord = (data, result) => {
  console.log("updateuser input: ", data);
  const query = `UPDATE users SET followers=?, following=? WHERE email=?`;
  sql.query(query, [data.followers, data.following, data.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      //return;
    }
    //console.log("after update user", res);
    result(null, res);
  });
};

Follow.getFollowCount = (email, result) => {
  console.log("email in follow count:", email);
  const query = `SELECT t1.following, t2.followers FROM
    (SELECT count(email) AS following FROM followers WHERE email=?) AS t1,
    (SELECT count(femail) AS  followers FROM followers WHERE femail=?) AS t2`;
  sql.query(query, [email, email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }

    const resObject = {
      ...res[0],
      email,
    };
    console.log("get follow count response: ", resObject);
    result(null, resObject);
  });
};

Follow.getFollowByEmailId = (data, result) => {
  const query = `SELECT count(email) AS count FROM followers WHERE email=? AND femail=?`;
  sql.query(query, [data.email, data.femail], (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
    }
    result(null, res[0].count);
  });
};
module.exports = Follow;
