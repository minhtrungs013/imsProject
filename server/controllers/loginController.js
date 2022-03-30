const md5 = require("md5");
const userModel = require("../models/userModel");
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
    if (!username) {
      return res.status(400).json("You need to enter username");
    }
    if (!password) {
      return res.status(400).json("You need to enter password");
    }
    {
      const passwordMd5 = md5(req.body.password);
      userModel.get({ username, passwordMd5 }, (response) => {
        if (response.length > 0) {
          const accessToken = loginController.generateAccessToken(username,password);
          return res.status(200).json({ accessToken});
        }
        {
          return res.status(400).json("Incorrect userName or password");
        }
      });
    }
  },
};
module.exports = loginController;
