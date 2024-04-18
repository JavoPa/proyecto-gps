const Bicicleta = require("../models/bicicleta.model.js");

exports.create = async (req, res) => {
    try {
        const bicicleta = new Bicicleta({
            color: req.body.color,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            estado: req.body.estado
        });
        const data = await bicicleta.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear la Bicicleta."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const bicicletas = await Bicicleta.find();
        res.send(bicicletas);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar las bicicletas."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const bicicleta = await Bicicleta.findById(req.params.bicicletaId);
        if (!bicicleta) {
            return res.status(404).send({
                message: "Bicicleta no encontrada con id " + req.params.bicicletaId
            });
        }
        res.send(bicicleta);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bicicleta no encontrada con id " + req.params.bicicletaId
            });
        }
        res.status(500).send({
            message: "Error al recuperar la bicicleta con id " + req.params.bicicletaId
        });
    }
};

exports.update = async (req, res) => {
    try {
        const bicicleta = await Bicicleta.findByIdAndUpdate(req.params.bicicletaId, {
            color: req.body.color,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            estado: req.body.estado
        }, { new: true });
        if (!bicicleta) {
            return res.status(404).send({
                message: "Bicicleta no encontrada con id " + req.params.bicicletaId
            });
        }
        res.send(bicicleta);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Bicicleta no encontrada con id " + req.params.bicicletaId
            });
        }
        res.status(500).send({
            message: "Error al actualizar la bicicleta con id " + req.params.bicicletaId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const bicicleta = await Bicicleta.findByIdAndRemove(req.params.bicicletaId);
        if (!bicicleta) {
            return res.status(404).send({
                message: "Bicicleta no encontrada con id " + req.params.bicicletaId
            });
        }
        res.send({ message: "Bicicleta eliminada exitosamente!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Bicicleta no encontrada con id " + req.params.bicicletaId
            });
        }
        res.status(500).send({
            message: "No se pudo eliminar la bicicleta con id " + req.params.bicicletaId
        });
    }
};
