const pool = require("../config/database");

// GET /empleados
const listarEmpleados = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT id, nombre, especialidad
            FROM empleados_empleado
            ORDER BY id
        `);

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los empleados"
        });
    }
};

// GET /empleados/:id
const obtenerEmpleado = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT id, nombre, especialidad
            FROM empleados_empleado
            WHERE id = $1
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Empleado no encontrado"
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener el empleado"
        });
    }
};

// POST /empleados
const crearEmpleado = async (req, res) => {
    try {
        const { nombre, especialidad } = req.body;

        if (!nombre || !especialidad) {
            return res.status(400).json({
                error: "Nombre y especialidad son obligatorios"
            });
        }

        const resultado = await pool.query(`
            INSERT INTO empleados_empleado (nombre, especialidad)
            VALUES ($1, $2)
            RETURNING id, nombre, especialidad
        `, [nombre, especialidad]);

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al crear el empleado"
        });
    }
};

// PUT /empleados/:id
const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad } = req.body;

        if (!nombre || !especialidad) {
            return res.status(400).json({
                error: "Nombre y especialidad son obligatorios"
            });
        }

        const resultado = await pool.query(`
            UPDATE empleados_empleado
            SET nombre = $1,
                especialidad = $2
            WHERE id = $3
            RETURNING id, nombre, especialidad
        `, [nombre, especialidad, id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Empleado no encontrado"
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al actualizar el empleado"
        });
    }
};

// DELETE /empleados/:id
const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            DELETE FROM empleados_empleado
            WHERE id = $1
            RETURNING id
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Empleado no encontrado"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);

        if (error.code === "23503") {
            return res.status(409).json({
                error: "No se puede eliminar el empleado porque tiene datos relacionados"
            });
        }

        res.status(500).json({
            error: "Error al eliminar el empleado"
        });
    }
};

module.exports = {
    listarEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
};