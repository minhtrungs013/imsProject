const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
// fix bug error CORS
const cors = require("cors");
app.use(cors());
// import Router
const authRoute = require("./routers/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/", authRoute);
//candidate
var candidateRouter = require("./routers/candidate");
app.use("/candidate",candidateRouter);
app.listen(port, () => {
  console.log("App start success");
});
