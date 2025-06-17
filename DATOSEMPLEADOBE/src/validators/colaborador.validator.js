const { body } = require('express-validator');

const validarColaborador = [
    body('nombre').notEmpty().withMessage('Datos Obligatorios'),
    body('apellido').notEmpty().withMessage('Datos Obligatorios'),
    body('edad')
        .isInt({ gt: 0 })
        .withMessage('La edad debe ser un número mayor a 0'),
];

module.exports = {
    validarColaborador,
};
