const express = require("express");
const app = express();
const db = require("./models/index");
const initRoutes = require("./routes/tutorialRouter");
global.__basedir = __dirname + "/..";
app.use(express.urlencoded({ extended: true }));
const port = 8000;
app.use("/api", initRoutes);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
