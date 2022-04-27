const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());
const { requireToken } = require("./middleware/index");

// import Router
const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");
const mentor = require("./routers/mentor");
const internship = require("./routers/internship");
dotenv.config();
const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ROUTES
app.use(authRoute);
app.use(courseRoute);
app.use(mentor);
app.use(internship);
app.listen(port, () => {
  console.log("App start success");
});
