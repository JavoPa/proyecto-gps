const Acceso = require("../models/acceso.model");

const getHistorialByUsuarioId = async (usuarioId) => {
    try {
        const historial = await Acceso.find({ usuario: usuarioId })
            .populate('usuario')
            .populate('invitado')
            .populate('guardia')
            .exec();
        return historial;
    } catch (error) {
        throw new Error('Error al obtener el historial de accesos');
    }
};

module.exports = {
    getHistorialByUsuarioId,
};