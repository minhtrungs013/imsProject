const express = require("express");
const app = express();
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
dotenv.config();
const port = process.env.PORT;
// fix bug error CORS
const cors = require("cors");
app.use(cors());
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routers/*.js"],
};
// import Router
const specs = swaggerJsDoc(options);
const authRoute = require("./routers/auth");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use(authRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
  console.log("App start success");
});
