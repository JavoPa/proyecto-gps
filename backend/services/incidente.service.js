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
 * Obtiene todos los incidentes que ocurrieron en cierto mes y año
 * @param {Date} date La fecha en la que ocurrieron los incidentes (considerando sólo mes y año)
 * @returns {Promise} Promesa con el objeto de incidentes
 */
async function getIncidentesMes(date) {
    try {
        // Obtener el mes y el año de la fecha
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();

        // Comienzo del mes
        const startOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0));

        // Se calcula el fin del mes
        const endOfMonth = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

        const incidentes = await Incidente.find({
            fecha: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (!incidentes || incidentes.length === 0) {
            return [null, "No hay incidentes en el mes especificado"];
        }

        return [incidentes, null];
    } catch (error) {
        handleError(error, "incidente.service -> getIncidentesMes");
        return [null, "Error al obtener incidentes del mes"];
    }
}

/**
 * Obtiene todos los incidentes que ocurrieron en cierto día
 * @param {Date} date La fecha en la que ocurrieron los incidentes
 * @returns {Promise} Promesa con el objeto de incidentes
 */
async function getIncidentesDia(date) {
    try {
        // Asegurarse que la fecha se interpreta en UTC
        // Había un error donde daba los incidentes del día anterior debido a la diferencia de zona horaria
        
        date.setUTCHours(0, 0, 0, 0);

        // Pescar el año, el mes y el día
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        // Marcar el comienzo y el fin del día
        const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59));

        const incidentes = await Incidente.find({
            fecha: { $gte: startOfDay, $lte: endOfDay }
        });

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
        const incidente = await new Incidente({
            fecha: data.fecha,
            hora: data.hora,
            lugar: data.lugar,
            tipo: data.tipo,
            descripcion: data.descripcion,
            informante: data.informante
        }).save();

        return [incidente, null];
    } catch (error) {
        handleError(error, "incidente.service -> crearIncidente");
        return [null, "Error al crear el incidente"];
    }
}

module.exports = {
    getIncidentes,
    getIncidentesMes,
    getIncidentesDia,
    crearIncidente
};