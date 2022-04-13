const mysql = require("mysql");

const connection = mysql.createConnection({
  port: "3306",
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

connection.connect((err) => {
  if (!err) {
    console.log("database connection successful");
  } else {
    console.log("Database connection failed");
  }
});
module.exports = connection;
