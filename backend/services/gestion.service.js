const Guardia = require("../models/guardia.model");
const { handleError } = require("../utils/errorHandler");
/**
 * @returns {Promise}
 */
async function getGuardias() {
    try {
        const guardias = await Guardia.find().select({
            _id: 1,
            rut: 1,
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
 * Valida el RUT chileno
 * @param {string} rut 
 * @returns {boolean}
 */
function validarRUT(rut) {

    rut = rut.replace(/\./g, '').replace(/-/g, '');    
    const rutNumeros = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;
    for (let i = rutNumeros.length - 1; i >= 0; i--) {
        suma += parseInt(rutNumeros[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    // Comparar dígito verificador calculado con el dígito verificador proporcionado
    return dv === dvCalculado;
}

/**
 * @param {Object} guardiaData
 * @returns {Promise} 
 */
async function createGuardia(guardiaData) {
    try {
        const { rut, nombre, apellido, fono, correo, password, rol, cargo, situacion_laboral } = guardiaData;
        const guardiaFound = await Guardia.findOne({ rut });
        if (guardiaFound) return [null, "El guardia con ese rut ya existe"];
        const guardiaFound2 = await Guardia.findOne({ correo });
        if (guardiaFound2) return [null, "El guardia con ese correo ya existe"];
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
        if (!validarRUT(newGuardia.rut)) {
            return [null, "El RUT no es válido"];
        }
        if (newGuardia.nombre.includes('  ')) {
            return [null, "El nombre del guardia no puede estar vacio"];
          }
        if (newGuardia.apellido.includes('  ')) {
        return [null, "El apellido del guardia no puede estar vacio"];
        }          
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
        return ["Guardia eliminado", null];
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