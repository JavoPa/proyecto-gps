const Guardia = require("../models/guardia.model");
const { handleError } = require("../utils/errorHandler");
/**
 * @returns {Promise}
 */
async function getGuardias() {
    try {
        const guardias = await Guardia.find().select({
            _id: 1,
            nombre: 1,
            apellido: 1,
            situacion_laboral: 1
        }).exec();
        if (!guardias) return [null, "No hay Guardias"];
        return [guardias, null];
    } catch (error) {
        handleError(error, "guardia.service -> getGuardias");
        throw error;
    }
}

/** 
 * @param {string} id
 * @returns {Promise} 
 */
async function getGuardiaById(id) {
    try {
        const guardia = await Guardia.findById({ _id: id }).select({
            _id: 1,
            nombre: 1,
            apellido: 1,
            rut: 1,
            fono: 1,
            correo: 1,
            cargo: 1,
            situacion_laboral: 1
        }).exec();
        if (!guardia) return [null, "El guardia no existe"];
        return [guardia, null];
    } catch (error) {
        handleError(error, "guardia.service -> getGuardiaById");
        throw error;
    }
}

/**
 * @param {Object} guardiaData
 * @returns {Promise} 
 */
async function createGuardia(guardiaData) {
    try {
        const { rut, nombre, apellido, fono, correo, password, rol, cargo, situacion_laboral } = guardiaData;
        const guardiaFound = await Guardia.findOne({ rut });
        if (guardiaFound) return [null, "El guardia ya existe"];
        const newGuardia = new Guardia({
            rut,
            nombre,
            apellido,
            fono,
            correo,
            password: await Guardia.encryptPassword(password),
            rol,
            cargo,
            situacion_laboral
        });
        await newGuardia.save();
        return [newGuardia, null];
    } catch (error) {
        handleError(error, "guardia.service -> createGuardia");
        throw error;
    }
}

/**
 * @param {string} id
 * @param {Object} guardiaData
 * @returns {Promise} 
 */
async function updateGuardia(id, guardiaData) {
    try {
        const guardiaFound = await Guardia.findById(id);
        if (!guardiaFound) return [null, "El guardia no existe"];

        const { rut, nombre, apellido, fono, correo, password, rol, cargo, situacion_laboral } = guardiaData;

        const updatedData = {
            rut,
            nombre,
            apellido,
            fono,
            correo,
            rol,
            cargo,
            situacion_laboral
        };

        // Si se proporciona una nueva contraseña, encriptarla antes de actualizar
        if (password) {
            updatedData.password = await Guardia.encryptPassword(password);
        }

        const guardiaUpdated = await Guardia.findByIdAndUpdate(id, updatedData, { new: true });

        return [guardiaUpdated, null];
    } catch (error) {
        handleError(error, "guardia.service -> updateGuardia");
        throw error;
    }
}

/**
 * @param {string} id
 * @returns {Promise}
 */
async function deleteGuardia(id) {
    try {
        const guardia = await Guardia.findById({ _id: id });
        if (!guardia) return [null, "El guardia no existe"];
        await Guardia.findByIdAndDelete(id);
        return [null, "Guardia eliminado"];
    } catch (error) {
        handleError(error, "guardia.service -> deleteGuardia");
        throw error;
    }
}

module.exports = {
    getGuardias,
    getGuardiaById,
    createGuardia,
    updateGuardia,
    deleteGuardia
};