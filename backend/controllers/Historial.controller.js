const accesoService = require("../services/Historial.service");

const getHistorialByUsuarioId = async (req, res) => {
    const usuarioId = req.params.usuarioId;

    try {
        const historial = await accesoService.getHistorialByUsuarioId(usuarioId);
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHistorialByUsuarioId,
};