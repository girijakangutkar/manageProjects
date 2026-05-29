const swaggerJsDoc = require("swagger-jsdoc");

const isProduction = process.env.NODE_ENV === "production";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "API documentation for Auth + Project APIs"
    },
    servers: [
      {
        url: isProduction
          ? "https://manage-projects-git-master-girijakangutkars-projects.vercel.app"
          : "http://localhost:5000",
        description: isProduction ? "Production Server" : "Local Server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;