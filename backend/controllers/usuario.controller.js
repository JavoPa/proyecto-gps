const Usuario = require("../models/usuario.model.js");

exports.create = async (req, res) => {
    try {
        const usuario = new Usuario({
            rut: req.body.rut,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fono: req.body.fono,
            correo: req.body.correo
        });
        const data = await usuario.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear el Usuario."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar los usuarios."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.send(usuario);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.status(500).send({
            message: "Error al recuperar usuario con id " + req.params.usuarioId
        });
    }
};

exports.update = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.usuarioId, {
            rut: req.body.rut,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fono: req.body.fono,
            correo: req.body.correo
        }, { new: true });
        if (!usuario) {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.send(usuario);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.status(500).send({
            message: "Error al actualizar usuario con id " + req.params.usuarioId
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndRemove(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.send({ message: "Usuario eliminado exitosamente!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Usuario no encontrado con id " + req.params.usuarioId
            });
        }
        res.status(500).send({
            message: "No se pudo eliminar el usuario con id " + req.params.usuarioId
        });
    }
};
