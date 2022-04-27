const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");
app.use(cors());
const { requireToken } = require("./middleware/index");

const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");
const candidate = require("./routers/candidate");
const email = require("./routers/email");
const mentor = require("./routers/mentor");
const dg = require("./routers/dg");
dotenv.config();
const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(dg);

app.use(requireToken, email);

app.listen(port, () => {
  console.log("App start success");
});
