"use strict";
// Importa el modelo de datos 'incidente'
const Incidente = require("../models/incidente.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los incidentes de la base de datos
 * @returns {Promise} Promesa con el objeto de los incidentes
 */
async function getIncidentes() {
    try {
        const incidentes = await Incidente.find();

        if (!incidentes) return [null, "No hay incidentes"];

        return [incidentes, null];
    } catch (error) {
        handleError(error, "incidente.service -> getIncidentes");
    }
}

/**
 * Obtiene todos los incidentes que ocurrieron en cierto día
 * @param {Date} date La fecha en la que ocurrieron los incidentes
 * @returns {Promise} Promesa con el objeto de incidentes
 */
async function getIncidentesDia(date) {
    try {
        // Ensure date is interpreted as UTC
        date.setUTCHours(0, 0, 0, 0);

        // Get the year, month, and day of the specified date
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();

        // Set the start and end of the day in UTC
        const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59));

        // Find incidents that occurred between the start and end of the day
        const incidentes = await Incidente.find({
            fecha: { $gte: startOfDay, $lte: endOfDay }
        });

        if (!incidentes || incidentes.length === 0) {
            return [null, "No hay incidentes en el día especificado"];
        }

        return [incidentes, null];
    } catch (error) {
        handleError(error, "incidente.service -> getIncidentesDia");
        return [null, "Error al obtener incidentes del día"];
    }
}

/**
 * Crea un nuevo incidente en la base de datos
 * @param {object} incidentData La data del incidente
 * @returns {Promise} Promesa con el objeto de incidente creado
 */
async function crearIncidente(data) {
    try {
        const incidente = new Incidente({
            fecha: data.fecha,
            hora: data.hora,
            lugar: data.lugar,
            tipo: data.tipo,
            descripcion: data.descripcion
        }).save();

        return [incidente, null];
    } catch (error) {
        handleError(error, "incidente.service -> crearIncidente");
        return [null, "Error al crear el incidente"];
    }
}

module.exports = {
    getIncidentes,
    getIncidentesDia,
    crearIncidente
};