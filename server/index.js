const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// fix bug error CORS
const cors = require("cors");
app.use(cors());
const port = process.env.PORT;
// connection DB
const db = require("./config/db");
// middleware 
 const middlewareController = require("./controllers/middlewareController");

// import Router
const loginRoute = require("./routers/loginRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use("/", loginRoute);

app.listen(port, () => {
  console.log("App start success");
});
