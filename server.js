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
  "/api-docs-assets",
  express.static(path.join(__dirname, "../node_modules/swagger-ui-dist"))
);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: "/api-docs-assets/swagger-ui.css",
    customJs: [
      "/api-docs-assets/swagger-ui-bundle.js",
      "/api-docs-assets/swagger-ui-standalone-preset.js",
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