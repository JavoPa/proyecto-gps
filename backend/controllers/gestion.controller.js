"use strict";
const guardiaService = require("../services/gestion.service");
const { respondSuccess, respondError } = require("../utils/resHandler");
const {guardiaIdSchema, guardiaSchema, guardiaSchema2} = require("../schema/guardia.schema");

/**
 * Obtener todos los guardias
 * @param {Object} req
 * @param {Object} res
 */
async function getGuardias(req, res) {
    try {
        const [guardias, error] = await guardiaService.getGuardias();
        if (error) return res.status(404).json({ message: error });
        return res.status(200).json(guardias);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener los guardias" });
    }
}
/**
 * Obtener un guardia por ID
 * @param {Object} req
 * @param {Object} res
 */
async function getGuardiaById(req, res) {
    try {
        const { id } = req.params;
        const [guardia, error] = await guardiaService.getGuardiaById(id);
        if (error) return res.status(404).json({ message: error });
        return res.status(200).json(guardia);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener el guardia", error: error.message });
    }
}

/**
 * Crear un nuevo guardia
 * @param {Object} req
 * @param {Object} res
 */
async function createGuardia(req, res) {
    try {
        const { error, value } = guardiaSchema.validate(req.body);        
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const guardiaData = value;
        const [guardia, serviceError] = await guardiaService.createGuardia(guardiaData);
        if (serviceError) {
            return res.status(400).json({ message: serviceError });
        }
        return res.status(201).json(guardia);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el guardia", error: error.message });
    }
}

/**
 * Actualizar un guardia por ID
 * @param {Object} req
 * @param {Object} res
 */
async function updateGuardia(req, res) {
    try {
        // Validar los datos de la solicitud
        const { error, value } = guardiaSchema2.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Si no hay error, proceder con la actualización
        const guardiaData = value;
        const { id } = req.params;
        const [guardia, serviceError] = await guardiaService.updateGuardia(id, guardiaData);
        if (serviceError) {
            return res.status(400).json({ message: serviceError });
        }
        return res.status(200).json(guardia);
    } catch (error) {
        // Manejar errores del servidor
        return res.status(500).json({ message: "Error al actualizar el guardia", error: error.message });
    }
}


/**
 * Borrar un guardia por ID
 * @param {Object} req
 * @param {Object} res
 */
async function deleteGuardia(req, res) {
    try {
        const { id } = req.params;
        const [result, error] = await guardiaService.deleteGuardia(id);
        if (error) return res.status(400).json({ message: error });
        return res.status(200).json({ message: result });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el guardia", error: error.message });
    }
}

module.exports = {
    getGuardias,
    getGuardiaById,
    createGuardia,
    updateGuardia,
    deleteGuardia
};