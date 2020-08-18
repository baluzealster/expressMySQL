const sql = require("./db");
const UnFollow = function (data) {
  (this.email = data.email), (this.unfollow = data.unfollow);
};
const Follow = require("./follow_model");

UnFollow.unFollowUser = (data, result) => {
  let response = [];
  Object.keys(data).forEach((key, index) => {
    Follow.getFollowCount(data[key], (err, followData) => {
      if (err) {
        result(err, null);
      }
      if (followData) {
        console.log("followdata: ", followData);
        response.push(
          UnFollow.updateUserRecord(followData, (err, updatedUser) => {
            if (err) {
              return err;
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
  sql.query(
    query,
    [data.followers - 1, data.following - 1, data.email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err);
        return;
      }
      //console.log("after update user", res);
      result(null, res);
    }
  );
};

module.exports = UnFollow;
