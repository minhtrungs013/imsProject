const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());
const { requireToken } = require("./middleware/index");
const authRoute = require("./routers/auth");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", authRoute);
const mentor = require("./routers/mentor");
app.use("/mentor", mentor);
app.listen(port, () => {
  console.log("App start success");
});
