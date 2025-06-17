const { validationResult } = require('express-validator');
const db = require('../config/db');

const crearColaborador = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body;

    try {
        const sql = `
      INSERT INTO COLABORADOR (NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        const [result] = await db.query(sql, [
            nombre,
            apellido,
            direccion || null,
            edad,
            profesion || null,
            estadocivil || null,
        ]);

        res.status(201).json({ message: 'Colaborador creado', id: result.insertId });
    } catch (error) {
        console.error('Error al crear colaborador:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const actualizarColaborador = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { id } = req.params;
    const { nombre, apellido, direccion, edad, profesion, estadocivil } = req.body;

    try {
        const sql = `
      UPDATE COLABORADOR
      SET NOMBRE = ?, APELLIDO = ?, DIRECCION = ?, EDAD = ?, PROFESION = ?, ESTADOCIVIL = ?
      WHERE IDCOLABORADOR = ?
    `;

        const [result] = await db.query(sql, [
            nombre,
            apellido,
            direccion || null,
            edad,
            profesion || null,
            estadocivil || null,
            id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }

        res.json({ message: 'Colaborador actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar colaborador:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const dataTableColaborador = async (req, res) => {
    const { start = 0, length = 10, search = {}, order = [] } = req.body;

    const searchValue = search.value || '';
    const orderColumnIndex = order[0]?.column || 0;
    const orderDir = order[0]?.dir === 'desc' ? 'DESC' : 'ASC';

    const columns = ['IDCOLABORADOR', 'NOMBRE', 'APELLIDO', 'DIRECCION', 'EDAD', 'PROFESION', 'ESTADOCIVIL'];
    const orderColumn = columns[orderColumnIndex] || 'IDCOLABORADOR';

    try {
        // Total sin filtrar
        const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM COLABORADOR`);

        // Total filtrado
        const [filteredResult] = await db.query(
            `SELECT COUNT(*) as total FROM COLABORADOR WHERE 
        NOMBRE LIKE ? OR APELLIDO LIKE ? OR PROFESION LIKE ?`,
            [`%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`]
        );

        // Datos paginados
        const [data] = await db.query(
            `SELECT * FROM COLABORADOR
       WHERE NOMBRE LIKE ? OR APELLIDO LIKE ? OR PROFESION LIKE ?
       ORDER BY ${orderColumn} ${orderDir}
       LIMIT ? OFFSET ?`,
            [`%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`, parseInt(length), parseInt(start)]
        );

        res.json({
            draw: req.body.draw,
            recordsTotal: total,
            recordsFiltered: filteredResult[0].total,
            data
        });
    } catch (err) {
        console.error('Error en datatable:', err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const eliminarColaborador = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM COLABORADOR WHERE IDCOLABORADOR = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Colaborador no encontrado' });
        }

        res.status(200).json({ message: 'Colaborador eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar colaborador:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};



module.exports = {
    crearColaborador,
    actualizarColaborador,
    dataTableColaborador,
    eliminarColaborador
};
