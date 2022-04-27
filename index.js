const express = require("express");
const app = express();
const dotenv = require("dotenv");
const candidate= require("./routers/candidate")
dotenv.config();
const { requireToken } = require("./middleware/index");
const port = process.env.PORT;

const cors = require("cors");
app.use(cors());

const authRoute = require("./routers/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRoute);

app.use(requireToken,candidate);

app.listen(port, () => {
  console.log("App start success");
});
