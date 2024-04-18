const Guardia = require("../models/guardia.model.js");

exports.create = async (req, res) => {
    try {
        const guardia = new Guardia({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cargo: req.body.cargo,
            situacion_laboral: req.body.situacion_laboral
        });
        const data = await guardia.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear el Guardia."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const guardias = await Guardia.find();
        res.send(guardias);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar los guardias."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const guardia = await Guardia.findById(req.params.guardiaId);
        if (!guardia) {
            return res.status(404).send({
                message: "Guardia no encontrado con id " + req.params.guardiaId
            });
        }
        res.send(guardia);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Guardia no encontrado con id " + req.params.guardiaId
            });
        }
        res.status(500).send({
            message: "Error al recuperar el guardia con id " + req.params.guardiaId
        });
    }
};

exports.update = async (req, res) => {
    try {
        const guardia = await Guardia.findByIdAndUpdate(req.params.guardiaId, {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cargo: req.body.cargo,
            situacion_laboral: req.body.situacion_laboral
        }, { new: true });
        if (!guardia) {
            return res.status(404).send({
                message: "Guardia no encontrado con id " + req.params.guardiaId
            });
        }
        res.send(guardia);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Guardia no encontrado con id " + req.params.guardiaId
            });
        }
        res.status(500).send({
            message: "Error al actualizar el guardia con id " + req.params.guardiaId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const guardia = await Guardia.findByIdAndRemove(req.params.guardiaId);
        if (!guardia) {
            return res.status(404).send({
                message: "Guardia no encontrado con id " + req.params.guardiaId
            });
        }
        res.send({ message: "Guardia eliminado exitosamente!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Guardia no encontrado con id " + req.params.guardiaId
            });
        }
        res.status(500).send({
            message: "No se pudo eliminar el guardia con id " + req.params.guardiaId
        });
    }
};
