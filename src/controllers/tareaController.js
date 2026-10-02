const pool = require("../config/database");

// GET /tareas
const listarTareas = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT 
                t.id,
                t.titulo,
                t.descripcion,
                t.estado,
                t.empleado_id AS "empleadoId",
                e.nombre AS empleado
            FROM tareas_tarea t
            LEFT JOIN empleados_empleado e
                ON t.empleado_id = e.id
            ORDER BY t.id
        `);

        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener las tareas"
        });
    }
};

// GET /tareas/:id
const obtenerTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT 
                t.id,
                t.titulo,
                t.descripcion,
                t.estado,
                t.empleado_id AS "empleadoId",
                e.nombre AS empleado
            FROM tareas_tarea t
            LEFT JOIN empleados_empleado e
                ON t.empleado_id = e.id
            WHERE t.id = $1
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener la tarea"
        });
    }
};

// POST /tareas
const crearTarea = async (req, res) => {
    try {
        const {
            titulo,
            descripcion,
            estado,
            empleadoId
        } = req.body;

        if (!titulo || !descripcion || !estado) {
            return res.status(400).json({
                error: "Título, descripción y estado son obligatorios"
            });
        }

        const resultado = await pool.query(`
            INSERT INTO tareas_tarea
                (titulo, descripcion, estado, empleado_id)
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                titulo,
                descripcion,
                estado,
                empleado_id AS "empleadoId"
        `, [
            titulo,
            descripcion,
            estado,
            empleadoId || null
        ]);

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error(error);

        if (error.code === "23503") {
            return res.status(400).json({
                error: "El empleado indicado no existe"
            });
        }

        res.status(500).json({
            error: "Error al crear la tarea"
        });
    }
};

// PUT /tareas/:id
const actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            titulo,
            descripcion,
            estado,
            empleadoId
        } = req.body;

        if (!titulo || !descripcion || !estado) {
            return res.status(400).json({
                error: "Título, descripción y estado son obligatorios"
            });
        }

        const resultado = await pool.query(`
            UPDATE tareas_tarea
            SET titulo = $1,
                descripcion = $2,
                estado = $3,
                empleado_id = $4
            WHERE id = $5
            RETURNING
                id,
                titulo,
                descripcion,
                estado,
                empleado_id AS "empleadoId"
        `, [
            titulo,
            descripcion,
            estado,
            empleadoId || null,
            id
        ]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);

        if (error.code === "23503") {
            return res.status(400).json({
                error: "El empleado indicado no existe"
            });
        }

        res.status(500).json({
            error: "Error al actualizar la tarea"
        });
    }
};

// DELETE /tareas/:id
const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            DELETE FROM tareas_tarea
            WHERE id = $1
            RETURNING id
        `, [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: "Tarea no encontrada"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al eliminar la tarea"
        });
    }
};

module.exports = {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};