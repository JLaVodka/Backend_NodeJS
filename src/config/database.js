const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
    console.log("Conexión establecida con PostgreSQL");
});

pool.on("error", (error) => {
    console.error("Error inesperado en PostgreSQL:", error);
});

module.exports = pool;