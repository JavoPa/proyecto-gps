const Jaula = require('../models/jaula.model');

async function listarJaulas(req, res) {
    try {
        const jaulas = await Jaula.find().populate('guardiaAsignado', 'nombre apellido').lean();
        const jaulasConEspaciosDisponibles = jaulas.map(jaula => ({
            _id: jaula._id,
            identificador: jaula.identificador,
            ubicacion: jaula.ubicacion,
            capacidad: jaula.capacidad,
            situacion_actual: jaula.situacion_actual,
            guardiaAsignado: jaula.guardiaAsignado ? `${jaula.guardiaAsignado.nombre} ${jaula.guardiaAsignado.apellido}` : 'No asignado'
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
            _id: jaula._id,
            ubicacion: jaula.ubicacion,
            capacidad: jaula.capacidad,
            situacion_actual: jaula.situacion_actual,
            identificador: jaula.identificador,
            espaciosDisponibles: espaciosDisponibles,
            guardiaAsignado: jaula.guardiaAsignado ? {
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

async function crearJaula(req, res) {
    const { ubicacion, capacidad, identificador } = req.body;

    try {
        const nuevaJaula = new Jaula({
            ubicacion,
            capacidad,
            identificador,
            situacion_actual: 0,
            guardiaAsignado: null
        });

        const jaulaGuardada = await nuevaJaula.save();
        res.status(201).send({ message: "Jaula creada exitosamente", jaula: jaulaGuardada });
    } catch (error) {
        console.error('Error al crear la jaula', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}
async function modificarJaula(req, res) {
    try {
        const { id } = req.params;
        const { ubicacion, capacidad, situacion_actual, identificador, guardiaAsignado } = req.body;

        const jaula = await Jaula.findById(id);
        if (!jaula) {
            return res.status(404).send({ message: 'Jaula no encontrada' });
        }

        jaula.ubicacion = ubicacion || jaula.ubicacion;
        jaula.capacidad = capacidad || jaula.capacidad;
        jaula.situacion_actual = situacion_actual || jaula.situacion_actual;
        jaula.identificador = identificador || jaula.identificador;
        jaula.guardiaAsignado = guardiaAsignado || jaula.guardiaAsignado;

        const jaulaModificada = await jaula.save();
        res.status(200).send({ message: 'Jaula modificada con éxito', jaula: jaulaModificada });
    } catch (error) {
        console.error('Error al modificar la jaula', error);
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

module.exports = { listarJaulas, getJaula, crearJaula, modificarJaula, eliminarJaula };
