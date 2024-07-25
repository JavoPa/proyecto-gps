const Jaula = require('../models/jaula.model');
const Guardia = require('../models/guardia.model');
const Acceso = require('../models/acceso.model');

async function listarJaulas(req, res) {
    try {
        const jaulas = await Jaula.find({})
            .populate('guardiaAsignado', 'nombre apellido')
            .lean();

        const jaulasConEspaciosDisponibles = jaulas.map(jaula => ({
            _id: jaula._id,
            identificador: jaula.identificador,
            ubicacion: jaula.ubicacion,
            capacidad: jaula.capacidad,
            guardiaAsignado: jaula.guardiaAsignado ? {
                nombre: jaula.guardiaAsignado.nombre,
                apellido: jaula.guardiaAsignado.apellido
            } : null
        }));

        res.status(200).json(jaulasConEspaciosDisponibles);
    } catch (error) {
        console.error('Error al listar las jaulas', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

async function listarJaulas(req, res) {
    try {
        const jaulas = await Jaula.find({})
            .populate('guardiaAsignado', 'nombre apellido') // Incluye la información del guardia asignado
            .lean();

        res.status(200).json(jaulas);
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

        const countAccesos = await Acceso.countDocuments({ guardia: jaula.guardiaAsignado?._id });
        const situacion_actual = jaula.capacidad - countAccesos;

        const response = {
            _id: jaula._id,
            ubicacion: jaula.ubicacion,
            capacidad: jaula.capacidad,
            situacion_actual: situacion_actual,
            identificador: jaula.identificador,
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
        jaula.guardiaAsignado = guardiaAsignado !== undefined ? guardiaAsignado : jaula.guardiaAsignado;

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

async function getGuardiaAsignado(req, res) {
    try {
        const jaulaId = req.params.id;
        const jaula = await Jaula.findById(jaulaId);
        const guardiaRes = await Guardia.findById(jaula.guardiaAsignado).select('-password');

        res.status(200).json(guardiaRes);
    } catch (error) {
        console.error('Error al listar las jaulas', error);
    }
}

async function getJaulaAsignada(req, res) {
    try {
        const guardiaId = req.id;

        const jaulaAsignada = await Jaula.findOne({ guardiaAsignado: guardiaId })
            .populate('guardiaAsignado', 'nombre apellido');

        if (!jaulaAsignada) {
            return res.status(200).send({ message: 'El guardia no está asignado a ninguna jaula.' });
        }

        const countAccesos = await Acceso.countDocuments({ guardia: jaulaAsignada.guardiaAsignado?._id });
        const situacion_actual = jaulaAsignada.capacidad - countAccesos;

        const response = {
            _id: jaulaAsignada._id,
            ubicacion: jaulaAsignada.ubicacion,
            capacidad: jaulaAsignada.capacidad,
            situacion_actual: situacion_actual,
            identificador: jaulaAsignada.identificador,
            guardiaAsignado: jaulaAsignada.guardiaAsignado ? {
                nombre: jaulaAsignada.guardiaAsignado.nombre,
                apellido: jaulaAsignada.guardiaAsignado.apellido
            } : null
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error al obtener la jaula asignada al guardia', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

module.exports = { listarJaulas, getJaula, crearJaula, modificarJaula, eliminarJaula, getGuardiaAsignado, getJaulaAsignada };
