"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const IncidenteService = require("../services/incidente.service.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Controlador para obtener todos los incidentes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getIncidentes(req, res) {
    try {
        const [incidentes, errorIncidentes] = await IncidenteService.getIncidentes();
        if (errorIncidentes) { return respondError(req, res, 404, errorIncidentes); }

        incidentes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, incidentes);
    } catch (error) {
        handleError(error, "incidente.controller -> getIncidentes");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Controlador para obtener todos los incidentes de un día en específico
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Response with incidents or error
 */
async function getIncidentesDia(req, res) {
    try {
        // Parsear la fecha del body
        const date = new Date(req.body.fecha + "T00:00:00Z");

        // Validar la fecha
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: "Fecha inválida" });
        }

        const [incidentes, error] = await IncidenteService.getIncidentesDia(date);
        if (error) { return res.status(500).json({ error: error }); }

        return res.status(200).json({ incidentes: incidentes });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener incidentes del día" });
    }
}

/**
 * Controlador para crear un nuevo incidente
 * @param {object} req - Objeto de petición
 * @param {object} res - Objeto de respuesta
 * @returns {object} - Respuesta con el incidente creado o error
 */
async function crearIncidente(req, res) {
    try {
        // Validar cuerpo del request
        let data = {
            fecha: new Date(req.body.fecha),
            hora: req.body.hora,
            lugar: req.body.lugar,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion
        };
        // Si no se especifica fecha, se trabaja con la fecha de hoy
        if (isNaN(data.fecha)) { data.fecha = new Date(Date.now()); }
        // Si no se especifica hora, se trabaja con la hora especificada en la fecha
        if (data.hora == '') { data.hora = `${data.fecha.getHours()}:${data.fecha.getMinutes()}` }
        // Si falta cualquier otro dato en el body
        if (data.lugar === '' || data.tipo === '' || data.descripcion === '') {
            return res.status(400).json({ error: "Falta información requerida" }); // Lanzar un error
        }
        //console.log(data);

        // Proceder a crear incidente
        const [incidenteGuardado, error] = await IncidenteService.crearIncidente(data);
        // Si el servicio para crear incidente devuelve un error, devolver el error
        if (error) { return res.status(400).json({ error: error }); }

        // Sino, devolver el incidente creado
        return res.status(201).json({ incidente: incidenteGuardado });
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el incidente" });
    }
}

module.exports = {
    getIncidentes,
    getIncidentesDia,
    crearIncidente
};