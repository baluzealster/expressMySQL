const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();
const httpServer = http.createServer(app); //latest add
const bodyParser = require("body-parser");
const connection = require("./models/db");
const users = require("./routes/user");
const upload = require("./routes/upload");
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api", upload);

// port establishment to the app
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`application listening on the port: ${port}`);
});
app.get("/", express.static(path.join(__dirname, "./public")));
