const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./models/db");
const users = require("./routes/user");
const follow = require("./routes/followers");
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("api/follow", follow);

// port establishment to the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`application listening on the port: ${port}`);
});
