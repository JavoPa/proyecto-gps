"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const IncidenteService = require("../services/incidente.service.js");
const { handleError } = require("../utils/errorHandler");
const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

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
        // Obtener la fecha de la query
        const fecha = req.query.fecha;

        // Validar el formato de la fecha (YYYY-MM-DD)
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormat.test(fecha)) {
            return res.status(400).json({ error: "Formato de fecha inválido. Use YYYY-MM-DD." });
        }
        
        // Parsear la fecha
        const date = new Date(fecha + "T00:00:00Z");
        
        //console.log(date);

        const [incidentes, errorIncidentes] = await IncidenteService.getIncidentesDia(date);

        incidentes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, incidentes);
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
        // Pescar la data
        let data = {
            fecha: new Date(req.body.fecha),
            hora: req.body.hora,
            lugar: req.body.lugar,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            informante: req.id
        };
        console.log(req.id);
        // Si no se especifica fecha, se trabaja con la fecha de hoy
        if (isNaN(data.fecha)) { data.fecha = new Date(Date.now()); }
        // Si no se especifica hora, se trabaja con la hora especificada en la fecha
        if (data.hora == '') { data.hora = `${data.fecha.getHours()}:${data.fecha.getMinutes()}` }
        // Si falta cualquier otro dato en el body
        if (data.lugar === '' || data.tipo === '' || data.descripcion === '') {
            return res.status(400).json({ error: "Falta información requerida" }); // Lanzar un error
        }

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

/**
 * Controlador para generar un informe PDF de los incidentes de un mes específico
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} Response with PDF document or error
 */
async function generarInforme(req, res) {
    try {
        // Get year and month from query parameters
        const { year, month } = req.query;

        // Validate year and month format
        const yearFormat = /^\d{4}$/;
        const monthFormat = /^(0?[1-9]|1[012])$/;
        if (!yearFormat.test(year) || !monthFormat.test(month)) {
            return res.status(400).json({ error: "Formato de año o mes inválido. Año debe ser YYYY y mes debe ser MM." });
        }

        // Parse year and month to create a date object
        const date = new Date(year, month - 1); // Month is 0-indexed in JavaScript

        // Call service function to get incidents for the specified month
        const [incidentes, error] = await IncidenteService.getIncidentesMes(date);
        
        if (error) {
            return res.status(204).json({ error });
        }

        // Count incident types
        const incidentTypes = {
            'Robo': 0,
            'Desaparición': 0,
            'Otro': 0
        };

        incidentes.forEach(incidente => {
            if (incidentTypes[incidente.tipo] !== undefined) {
                incidentTypes[incidente.tipo]++;
            } else {
                incidentTypes['Otro']++;
            }
        });

        // Count incident places
        const incidentPlaces = {
            'Entrada': 0,
            'Gantes': 0,
            'Edificio AC': 0,
            'Edificio AB': 0,
            'Salas AA': 0,
            'FACE': 0,
            'exIM': 0,
            'Otro': 0
        };

        incidentes.forEach(incidente => {
            if (incidentPlaces[incidente.lugar] !== undefined) {
                incidentPlaces[incidente.lugar]++;
            } else {
                incidentPlaces['Otro']++;
            }
        });

        // Create a new PDF document
        const doc = new PDFDocument();
        let buffers = [];
        
        // Collect PDF data into buffers
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            const base64PDF = pdfData.toString('base64');
            res.json({ pdf: base64PDF });
        });

        // Add incident information to the PDF
        doc.fontSize(12).text(`Informe de incidentes del mes ${month} del año ${year}`, { align: 'center' });
        doc.moveDown();

        // Generate the incident type chart image
        const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 200 });
        const typeChartConfig = {
            type: 'bar',
            data: {
                labels: Object.keys(incidentTypes),
                datasets: [{
                    label: 'Frecuencia',
                    data: Object.values(incidentTypes),
                    backgroundColor: ['red', 'blue', 'green', 'orange']
                }]
            },
            options: {
                responsive: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tipos de incidentes'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Frecuencia'
                        }
                    }
                }
            }
        };
        const typeChartImage = await chartJSNodeCanvas.renderToBuffer(typeChartConfig);

        // Embed the incident type chart image in the PDF
        doc.image(typeChartImage, {
            fit: [500, 300],
            align: 'center',
            valign: 'center'
        });

        doc.moveDown(20); // Add a new page for the next chart

        // Generate the incident places chart image
        const placeChartConfig = {
            type: 'bar',
            data: {
                labels: Object.keys(incidentPlaces),
                datasets: [{
                    label: 'Frecuencia',
                    data: Object.values(incidentPlaces),
                    backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan', 'grey']
                }]
            },
            options: {
                responsive: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Lugares de incidentes'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Frecuencia'
                        }
                    }
                }
            }
        };
        const placeChartImage = await chartJSNodeCanvas.renderToBuffer(placeChartConfig);

        // Embed the incident places chart image in the PDF
        doc.image(placeChartImage, {
            fit: [500, 300],
            align: 'center',
            valign: 'center'
        });

        // Finalize the PDF document
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar el PDF' });
    }
}

module.exports = {
    getIncidentes,
    getIncidentesDia,
    crearIncidente,
    generarInforme
};