const mysql = require("mysql");
const dbConfig = require("../config/config");

const connection = mysql.createConnection({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
});
// //establishing connection to the mySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log("connection established successfully");
});

module.exports = connection;
