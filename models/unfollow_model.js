const sql = require("./db");
const UnFollow = function (data) {
  (this.email = data.email), (this.unfollow = data.unfollow);
};
const Follow = require("./follow_model");

UnFollow.unFollowUser = (data, result) => {
  let response = [];
  Object.keys(data).forEach((key, index, array) => {
    Follow.getFollowCount(data[key], (err, followDetails) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      } else if (!followDetails) {
        res.status(500).send("follow details has some error!!!!!!");
        return;
      } else {
        if (key === "unFollowEmail") {
          followDetails.followers = followDetails.followers - 1;
        } else if (key === "email") {
          followDetails.following = followDetails.following - 1;
        }
        response.push(
          UnFollow.updateUserRecord(followDetails, (err, updatedUser) => {
            if (err) {
              result(err);
              return;
            }
            return;
          })
        );
      }
    });
  });
  const query = `DELETE FROM follow WHERE email=? AND followEmail=?`;
  sql.query(query, [data.email, data.unFollowEmail], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    //console.log("after update user", res);
    result(null, res);
  });
};

UnFollow.updateUserRecord = (data, result) => {
  const query = `UPDATE users SET followers=?, following=? WHERE email=?`;
  sql.query(query, [data.followers, data.following, data.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    //console.log("after update user", res);
    result(null, res);
  });
};

module.exports = UnFollow;
