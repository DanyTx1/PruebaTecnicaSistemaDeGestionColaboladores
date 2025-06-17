const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();


/**
 * Usuario quemado (estático)
 */
const USER = {
    username: 'admin',
    password: '1234',
    role: 'admin'
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT generado
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USER.username && password === USER.password) {
        const token = jwt.sign({ username: USER.username, role: USER.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return res.json({ token });
    }
    res.status(401).json({ error: 'Credenciales inválidas' });
});

module.exports = router;
