const accesoService = require("../services/historial.service");
const path = require('path');

// Obtiene el historial completo
const getAllHistorial = async (req, res) => {
    try {
        const historial = await accesoService.getAllHistorial();
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtiene el historial del usuario autenticado
const getHistorialUsuario = async (req, res) => {
    const usuarioId = req.id;
    try {
        const historial = await accesoService.getHistorialByUsuarioId(usuarioId);
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {getAllHistorial, getHistorialUsuario};