const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./models/db");

//establishing connection to the mySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log("connection established successfully");
});

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// port establishment to the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`application listening on the port: ${port}`);
});
