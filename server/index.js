const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
// connection DB
const db = require("./config/db");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//internship

//candidate
var candidateRouter = require("./routers/candidateRouter.js");
app.use("/candidate",candidateRouter);
app.listen(port, () => {
  console.log("App start success");
});
