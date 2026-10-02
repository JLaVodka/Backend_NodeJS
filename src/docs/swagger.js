const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Microservicio de Empleados - NodeJS",
            version: "1.0.0",
            description: "API REST para gestionar empleados"
        },
        servers: [
            {
                url: process.env.API_URL || "http://localhost:3000",
                description: "Servidor"
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;