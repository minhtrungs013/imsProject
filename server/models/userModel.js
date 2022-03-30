const connect = require("../config/db");

const user = (users) => {
  this.idUser = users.idUser;
  this.userName = users.userName;
  this.password = users.password;
  this.email = users.email;
};

user.get = (condition, res) => {
  const query = buildQuery(condition);
  connect.query(query, function (error, users) {
    if (error) {
      return res(error);
    }
    return res(users);
  });
};

const buildQuery = (params) => {
  let stringQuery = "SELECT * FROM users WHERE 1 = 1";
  if (params.username) {
    stringQuery += " AND userName = '" + params.username + "'";
  }
  if (params.passwordMd5) {
    stringQuery += " AND password = '" + params.passwordMd5 + "'";
  }
  return stringQuery;
};

module.exports = user;
