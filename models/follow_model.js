const { response } = require("express");
const sql = require("./db");
const Follow = function (data) {
  (this.email = data.email), (this.follow = data.follow);
};

Follow.followUser = (data, result) => {
  const query = `INSERT INTO follow SET email=?, followEmail=?`;
  sql.query(query, [data.email, data.followEmail], (err, res) => {
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
  const query = `UPDATE users SET follow=?, following=? WHERE email=?`;
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
    (SELECT count(email) AS following FROM follow WHERE email=?) AS t1,
    (SELECT count(followEmail) AS  followers FROM follow WHERE followEmail=?) AS t2`;
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
  const query = `SELECT count(email) AS count FROM follow WHERE email=? AND followEmail=?`;
  sql.query(query, [data.email, data.followEmail], (err, res) => {
    if (err) {
      console.log("error", err);
      result(err);
    }
    result(null, res[0].count);
  });
};
module.exports = Follow;
