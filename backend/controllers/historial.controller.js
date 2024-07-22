const accesoService = require("../services/historial.service");

// Obtiene el historial para un usuario específico por ID
const getHistorialByUsuarioId = async (req, res) => {
    const usuarioId = req.params.usuarioId; // Obtén el usuarioId de los parámetros de la solicitud
    try {
        const historial = await accesoService.getHistorialByUsuarioId(usuarioId);
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

module.exports = {getHistorialByUsuarioId, getHistorialUsuario};