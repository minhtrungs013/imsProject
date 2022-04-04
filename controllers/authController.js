const md5 = require("md5");
const yaml = require("js-yaml");
const fs = require("fs");
const { generate } = require("../token/index");
const dotenv = require("dotenv");
dotenv.config();

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "You need to enter all the information",
    });
  }
  const user = yaml.load(fs.readFileSync(process.env.URL_YAML));
  const passwordMd5 = md5(req.body.password);
  const countUser = user.length;
  for (let i = 0; i < countUser; i++) {
    if (username === user[i].userName && passwordMd5 === user[i].password) {
      const accessToken = generate(username, password);
      return res.status(200).json({ accessToken });
    }
  }
  return res.status(400).json("Incorrect userName or password");
};

const profile = (req, res) => {
  const data = req.body;
  return res.status(200).json(data);
};

module.exports = {
  login: login,
  profile: profile,
};
