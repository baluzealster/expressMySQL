const mysql = require("mysql");
const dbConfig = require("../config/config");
const conn = mysql.createConnection({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  db: dbConfig.DB,
  password: dbConfig.PASSWORD,
});

module.exports = conn;
