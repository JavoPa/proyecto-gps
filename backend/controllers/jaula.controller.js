// jaula.controller.js
const Jaula = require('../models/jaula.model');


async function listarJaulas(req, res) {
    try {
        const jaulas = await Jaula.find({}, 'ubicacion identificador capacidad situacion_actual')  // Limita los campos devueltos por la consulta
            .lean(); // Utiliza lean para mejorar el rendimiento si no necesitas manipular los documentos

        const jaulasConEspaciosDisponibles = jaulas.map(jaula => ({
            identificador: jaula.identificador,
            ubicacion: jaula.ubicacion,
            espaciosDisponibles: jaula.capacidad - jaula.situacion_actual
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
            .populate('guardiaAsignado', 'nombre apellido');  // Asumiendo que el modelo de Usuario tiene 'nombre' y 'apellido'

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
            } : null
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}


// Función para crear una nueva jaula
async function crearJaula(req, res) {
    const { ubicacion, capacidad, identificador } = req.body;

    // Puedes añadir validaciones aquí para asegurarte de que los datos son correctos

    try {
        const nuevaJaula = new Jaula({
            ubicacion,
            capacidad,
            identificador,
            situacion_actual: 0, // Inicialmente vacía
            guardiaAsignado: null // Sin guardia asignado inicialmente
        });

        const jaulaGuardada = await nuevaJaula.save();
        res.status(201).send({ message: "Jaula creada exitosamente", jaula: jaulaGuardada });
    } catch (error) {
        console.error('Error al crear la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

module.exports = { listarJaulas, getJaula, crearJaula };
