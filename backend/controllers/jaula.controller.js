// jaula.controller.js
const { func } = require('joi');
const Jaula = require('../models/jaula.model');


async function listarJaulas(req, res) {
    try {
        const jaulas = await Jaula.find({}, 'ubicacion identificador capacidad situacion_actual')  
            .lean(); 
        const jaulasConEspaciosDisponibles = jaulas.map(jaula => ({
            identificador: jaula.identificador,
            ubicacion: jaula.ubicacion,
            espaciosDisponibles: jaula.capacidad - jaula.situacion_actual,
            horaLimiteIngreso: jaula.horaLimiteIngreso,
            horaLimiteSalida: jaula.horaLimiteSalida
        }));

        res.status(200).json(jaulasConEspaciosDisponibles);
    } catch (error) {
        console.error('Error al listar las jaulas', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

async function getJaula(req, res) {
    try {
        const jaula = await Jaula.findById(req.params.id)
            .populate('guardiaAsignado', 'nombre apellido'); 

        if (!jaula) {
            return res.status(404).send({ message: 'Jaula no encontrada.' });
        }

        const espaciosDisponibles = jaula.capacidad - jaula.situacion_actual;
        
        const response = {
            ubicacion: jaula.ubicacion,
            identificador: jaula.identificador,
            espaciosDisponibles: espaciosDisponibles,
            guardia: jaula.guardiaAsignado ? {
                nombre: jaula.guardiaAsignado.nombre,
                apellido: jaula.guardiaAsignado.apellido
            } : null,
            horaLimiteIngreso: jaula.horaLimiteIngreso,
            horaLimiteSalida: jaula.horaLimiteSalida
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}


async function crearJaula(req, res) {
    const { ubicacion, capacidad, identificador, horaLimiteIngreso, horaLimiteSalida } = req.body;


    try {
        const nuevaJaula = new Jaula({
            ubicacion,
            capacidad,
            identificador,
            situacion_actual: 0, 
            guardiaAsignado: null,
            horaLimiteIngreso,
            horaLimiteSalida
        });

        const jaulaGuardada = await nuevaJaula.save();
        res.status(201).send({ message: "Jaula creada exitosamente", jaula: jaulaGuardada });
    } catch (error) {
        console.error('Error al crear la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

// Probar esta función
async function actualizarJaula(req, res) {
    const jaulaId = await Jaula.findById(req.params.id)
    const { ubicacion, capacidad, identificador, horaLimiteIngreso, horaLimiteSalida } = req.body;

    try {
        const jaula = await Jaula.findById(jaulaId);
        if (!jaula) {
            return res.status(404).send({ message: 'Jaula no encontrada' });
        }

        jaula.ubicacion = ubicacion;
        jaula.capacidad = capacidad;
        jaula.identificador = identificador;
        jaula.horaLimiteIngreso = horaLimiteIngreso;
        jaula.horaLimiteSalida = horaLimiteSalida;

        await jaula.save();
        res.status(200).send({ message: 'Jaula actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}


async function eliminarJaula(req, res) {
    try {
        const jaulaId = req.params.id;


        const jaula = await Jaula.findById(jaulaId);
        if (!jaula) {
            return res.status(404).send({ message: 'Jaula no encontrada' });
        }

        if (jaula.guardiaAsignado) {
            return res.status(400).send({ message: 'No se puede eliminar una jaula con guardia asignado' });
        }

        await jaula.deleteOne();
        
        res.status(200).send({ message: 'Jaula eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}


module.exports = { listarJaulas, getJaula, crearJaula, eliminarJaula, actualizarJaula };
