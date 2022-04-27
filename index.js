const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");
app.use(cors());
const { requireToken } = require("./middleware/index");

// import Router
const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");
const candidate = require("./routers/candidate");
const email = require("./routers/email");
const mentor = require("./routers/mentor");
const internview = require("./routers/internview");
dotenv.config();
const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(authRoute);
app.use(requireToken, courseRoute);
app.use(requireToken, candidate);
app.use(requireToken, mentor);
app.use(requireToken, email);
app.use(requireToken, internview);
app.listen(port, () => {
  console.log("App start success");
});
