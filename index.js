const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());
const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");
const mentor = require("./routers/mentor");
const emailRoute = require("./routers/email");
const candidate = require("./routers/candidate");

dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoute);
app.use(courseRoute);
app.use(mentor);
app.use("/", emailRoute);
app.use(candidate);

app.listen(port, () => {
  console.log("App start success");
});
