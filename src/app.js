const express = require("express");
const swaggerUi = require("swagger-ui-express");

const empleadoRoutes = require("./routes/empleadoRoutes");
const tareaRoutes = require("./routes/tareaRoutes");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "Microservicio NodeJS funcionando correctamente"
    });
});

app.use("/empleados", empleadoRoutes);
app.use("/tareas", tareaRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;