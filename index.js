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
const importCandidate = require("./routers/import");

dotenv.config();
const port = process.env.PORT;
global.__basedir = __dirname + "/..";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use(authRoute);
app.use(courseRoute);
app.use(mentor);
app.use(importCandidate);
app.listen(port, () => {
  console.log("App start success");
});
