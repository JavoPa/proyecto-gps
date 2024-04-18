const Jaula = require("../models/jaula.model.js");

exports.create = async (req, res) => {
    try {
        const jaula = new Jaula({
            ubicacion: req.body.ubicacion,
            capacidad: req.body.capacidad,
            situacion_actual: req.body.situacion_actual
        });
        const data = await jaula.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear la Jaula."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const jaulas = await Jaula.find();
        res.send(jaulas);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar las jaulas."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const jaula = await Jaula.findById(req.params.jaulaId);
        if (!jaula) {
            return res.status(404).send({
                message: "Jaula no encontrada con id " + req.params.jaulaId
            });
        }
        res.send(jaula);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Jaula no encontrada con id " + req.params.jaulaId
            });
        }
        res.status(500).send({
            message: "Error al recuperar jaula con id " + req.params.jaulaId
        });
    }
};

exports.update = async (req, res) => {
    try {
        const jaula = await Jaula.findByIdAndUpdate(req.params.jaulaId, {
            ubicacion: req.body.ubicacion,
            capacidad: req.body.capacidad,
            situacion_actual: req.body.situacion_actual
        }, { new: true });
        if (!jaula) {
            return res.status(404).send({
                message: "Jaula no encontrada con id " + req.params.jaulaId
            });
        }
        res.send(jaula);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Jaula no encontrada con id " + req.params.jaulaId
            });
        }
        res.status(500).send({
            message: "Error al actualizar la jaula con id " + req.params.jaulaId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const jaula = await Jaula.findByIdAndRemove(req.params.jaulaId);
        if (!jaula) {
            return res.status(404).send({
                message: "Jaula no encontrada con id " + req.params.jaulaId
            });
        }
        res.send({ message: "Jaula eliminada exitosamente!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Jaula no encontrada con id " + req.params.jaulaId
            });
        }
        res.status(500).send({
            message: "No se pudo eliminar la jaula con id " + req.params.jaulaId
        });
    }
};
