const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
// fix bug error CORS
const cors = require("cors");
app.use(cors());
const {requireToken} = require("./middleware/index")

// import Router
const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/", authRoute);
app.use("/",requireToken, courseRoute);

app.listen(port, () => {
  console.log("App start success");
});
