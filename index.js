const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { requireToken } = require("./middleware/index");
const cors = require("cors");
const authRoute = require("./routers/auth");
const mentor = require("./routers/mentor");

dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// register route
app.use(authRoute);
app.use(mentor);

app.listen(port, () => {
  console.log("App start success");
});
