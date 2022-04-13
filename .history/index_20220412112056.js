const express = require("express");
const { DB } = require("./config/db");
const app = express();
const db = require("./models/index");
const initRoutes = require("./routes/tutorialRouter");
global.__basedir = __dirname + "/..";
app.use(express.urlencoded({ extended: true }));
// db.sequelize.sync();
const port = 9000;
app.use("/api", initRoutes);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
