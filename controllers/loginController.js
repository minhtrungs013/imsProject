const md5 = require("md5");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const yaml = require("js-yaml")
const fs = require("fs")

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
    const user = yaml.load(fs.readFileSync(process.env.URL_YAML));
    if (!username || !password) {
      return res.status(400).json("You need to enter all the information");
    }
    const passwordMd5 = md5(req.body.password);
    const countUser = user.length;
    for (let i = 0; i < countUser; i++) {
      if (username === user[i].userName && passwordMd5 === user[i].password) {
        const accessToken = loginController.generateAccessToken(
          username,
          password
        );
        return res.status(200).json({ accessToken });
      }
    }
    return res.status(400).json("Incorrect userName or password");
  },
};
module.exports = loginController;
