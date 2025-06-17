const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta principal
 *     description: Devuelve mensaje de estado
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});


/**
 * @swagger
 * /test-db:
 *   get:
 *     summary: Probar conexión con MySQL
 *     responses:
 *       200:
 *         description: Conexión exitosa
 *       500:
 *         description: Error en la conexión
 */
router.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ success: true, result: rows[0].result });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        res.status(500).json({ success: false, error: 'No se pudo conectar a la base de datos' });
    }
});

module.exports = router;
