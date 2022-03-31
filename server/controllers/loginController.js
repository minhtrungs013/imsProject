const md5 = require("md5");
const account = require("../config/account.json");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const loginController = {
  generateAccessToken: (username, password) => {
    return jwt.sign(
      {
        userName: username,
        password: password,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
  },
  login: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("You need to enter all the information");
    }
    {
      const listAccounts = account.user.length;
      const passwordMd5 = md5(req.body.password);
      for (var i = 0; i < listAccounts; i++) {
        if (username == account.user[i].userName && passwordMd5 == account.user[i].password){
          const accessToken = loginController.generateAccessToken(
            username,
            password
          );
          return res.status(200).json({ accessToken });
        }
      }
      return res.status(400).json("Incorrect userName or password");
    }
  },
};
module.exports = loginController;
