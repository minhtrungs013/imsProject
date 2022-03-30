const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
        if (err) {
          return res.status(403).json("you need to login again");
        }
        req.users = users;
        next();
      });
    } else {
      res.status(401).json("login error");
    }
  },
};
module.exports = middlewareController;
