const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/auth.middleware');
const { validarColaborador } = require('../validators/colaborador.validator');
const { crearColaborador, actualizarColaborador, dataTableColaborador, eliminarColaborador } = require('../controllers/colaboradores.controller');


/**
 * @swagger
 * /colaborador:
 *   get:
 *     summary: Obtener todos los Colaboradores
 *     tags:
 *      - Colaborador
 *     responses:
 *       200:
 *         description: Lista de colaboradores
 */
router.get('/', authMiddleware,  async (req, res) => {
    try {
        res.json({ message: 'Usuarios' });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

/**
 * @swagger
 * /colaborador/datatables:
 *   post:
 *     summary: Obtener lista paginada de colaboradores para DataTable
 *     tags:
 *       - Colaborador
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: integer
 *               length:
 *                 type: integer
 *               search:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *               order:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     column:
 *                       type: integer
 *                     dir:
 *                       type: string
 *     responses:
 *       200:
 *         description: Lista de colaboradores
 */
router.post('/datatables', authMiddleware, dataTableColaborador);

/**
 * @swagger
 * /colaborador:
 *   post:
 *     summary: Crear un nuevo colaborador
 *     tags:
 *       - Colaborador
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               direccion:
 *                 type: string
 *               edad:
 *                 type: integer
 *               profesion:
 *                 type: string
 *               estadocivil:
 *                 type: string
 *     responses:
 *       201:
 *         description: Colaborador creado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, validarColaborador, crearColaborador);

/**
 * @swagger
 * /colaborador/{id}:
 *   put:
 *     summary: Actualizar un colaborador por ID
 *     tags:
 *       - Colaborador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del colaborador
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               direccion:
 *                 type: string
 *               edad:
 *                 type: integer
 *               profesion:
 *                 type: string
 *               estadocivil:
 *                 type: string
 *     responses:
 *       200:
 *         description: Colaborador actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Colaborador no encontrado
 */
router.put('/:id', authMiddleware, validarColaborador, actualizarColaborador);


module.exports = router;

/**
 * @swagger
 * /colaborador/{id}:
 *   get:
 *     summary: Obtener un colaborador por ID
 *     tags:
 *       - Colaborador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del colaborador
 *       404:
 *         description: Colaborador no encontrado
 */
router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query(
            'SELECT * FROM COLABORADOR WHERE IDCOLABORADOR = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener colaborador por ID:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

/**
 * @swagger
 * /colaborador/{id}:
 *   delete:
 *     summary: Eliminar un colaborador por ID
 *     tags:
 *       - Colaborador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Colaborador eliminado correctamente
 *       404:
 *         description: Colaborador no encontrado
 */
router.delete('/:id', authMiddleware, eliminarColaborador);
