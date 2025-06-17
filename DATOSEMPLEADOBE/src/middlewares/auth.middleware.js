const jwt = require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    const tokenLimpio = token.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        req.user = decoded; // para acceder a los datos del usuario si los necesitas
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;
