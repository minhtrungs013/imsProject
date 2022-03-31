const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
// fix bug error CORS
const cors = require("cors");
app.use(cors());
// import Router
const loginRoute = require("./routers/loginRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/", loginRoute);

app.listen(port, () => {
  console.log("App start success");
});
