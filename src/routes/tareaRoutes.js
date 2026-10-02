const express = require("express");

const {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea
} = require("../controllers/tareaController");

const router = express.Router();

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Listar todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get("/", listarTareas);

/**
 * @swagger
 * /tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", obtenerTarea);

/**
 * @swagger
 * /tareas:
 *   post:
 *     summary: Crear una tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - estado
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *               empleadoId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post("/", crearTarea);

/**
 * @swagger
 * /tareas/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - estado
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               estado:
 *                 type: string
 *               empleadoId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/:id", actualizarTarea);

/**
 * @swagger
 * /tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", eliminarTarea);

module.exports = router;