const dotenv = require("dotenv");
const { verify } = require("../token/index");
dotenv.config();

const requireToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    const user = verify(accessToken);
    if (!user) {
      return res.status(403).json({error: "Token expire"});
    }
    req.user = user;
    next();
  } else {
    res.status(401).json({error:"Require token"});
  }
};

module.exports = {
  requireToken: requireToken,
};
