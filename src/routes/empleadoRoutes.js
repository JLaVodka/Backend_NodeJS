const express = require("express");

const {
    listarEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} = require("../controllers/empleadoController");

const router = express.Router();

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Listar todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 */
router.get("/", listarEmpleados);

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 */
router.get("/:id", obtenerEmpleado);

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Crear un empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - especialidad
 *             properties:
 *               nombre:
 *                 type: string
 *               especialidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empleado creado
 */
router.post("/", crearEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Empleados]
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
 *               - nombre
 *               - especialidad
 *             properties:
 *               nombre:
 *                 type: string
 *               especialidad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       404:
 *         description: Empleado no encontrado
 */
router.put("/:id", actualizarEmpleado);

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Empleado eliminado
 *       404:
 *         description: Empleado no encontrado
 */
router.delete("/:id", eliminarEmpleado);

module.exports = router;