const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRouter = require("./routes/AuthRoutes");
const projectRouter = require("./routes/projectsRoutes");
const path = require("path");

const app = express();
require("dotenv").config()
require("./config/db");

const port = 5000;

app.use(express.json())

// Swagger API 
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js",
    ],
  })
);

// Pilot server test
app.get("/", (req, res) => {
    res.status(200).json({msg: "Everything is working fine"})
})

// Auth router
app.use("/auth", authRouter);

// Projects router
app.use("/api", projectRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})