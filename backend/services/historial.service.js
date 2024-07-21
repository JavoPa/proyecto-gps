const Acceso = require("../models/acceso.model");

const getHistorialByUsuarioId = async (usuarioId) => {
    try {
        const historial = await Acceso.find({ usuario: usuarioId })
            .populate({
                path: 'usuario',
                select: 'nombre -_id' 
            })
            .populate('invitado')
            .lean()
            .exec();
        return historial;
    } catch (error) {
        throw new Error('Error al obtener el historial de accesos');
    }
};


module.exports = {
    getHistorialByUsuarioId,
};