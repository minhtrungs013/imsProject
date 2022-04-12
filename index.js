const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const cors = require("cors");
app.use(cors());

const authRoute = require("./routers/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRoute);

var candidate = require("./routers/candidate");
app.use(candidate);
app.listen(port, () => {
  console.log("App start success");
});
