
const Usuario = require("../models/usuario.model.js");
const Role = require("../models/roles.model.js");

async function esAcademico(req, res, next) {
    try {
        const UserAux = await Usuario.findOne({ correo: req.correo });
        const rolcitos = await Role.find({ _id: { $in: UserAux.roles } });
        for (let i = 0; i < rolcitos.length; i++) {
            if (rolcitos[i].name === "academico") {
              next();
              return;
            }
        }
        return res.status(403).send({ message: "Require Academico Role!" });
    } catch (error) {
        console.log(error);
    }
}

async function esEstudiante(req, res, next) {
    try {
        const UserAux = await Usuario.findOne({ correo: req.correo });
        const rolcitos = await Role.find({ _id: { $in: UserAux.roles } });
        for (let i = 0; i < rolcitos.length; i++) {
            if (rolcitos[i].name === "estudiante") {
              next();
              return;
            }
        }
        return res.status(403).send({ message: "Require estudiante Role!" });
    } catch (error) {
        console.log(error);
    }
}

async function esFuncionario(req, res, next) {
    try {
        const UserAux = await Usuario.findOne({ correo: req.correo });
        const rolcitos = await Role.find({ _id: { $in: UserAux.roles } });
        for (let i = 0; i < rolcitos.length; i++) {
            if (rolcitos[i].name === "funcionario") {
              next();
              return;
            }
        }
        return res.status(403).send({ message: "Require funcionario Role!" });
    } catch (error) {
        console.log(error);
    }
}

async function esAdmin(req, res, next) {
    try {
        const UserAux = await Usuario.findOne({ correo: req.correo });
        const rolcitos = await Role.find({ _id: { $in: UserAux.roles } });
        for (let i = 0; i < rolcitos.length; i++) {
            if (rolcitos[i].name === "administrador") {
              next();
              return;
            }
        }
        return res.status(403).send({ message: "Require administrador Role!" });
    } catch (error) {
        console.log(error);
    }
}

async function esGuardia(req, res, next) {
    try {
        const UserAux = await Usuario.findOne({ correo: req.correo });
        const rolcitos = await Role.find({ _id: { $in: UserAux.roles } });
        for (let i = 0; i < rolcitos.length; i++) {
            if (rolcitos[i].name === "Guardia") {
              next();
              return;
            }
        }
        return res.status(403).send({ message: "Require Guardia Role!" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { esAcademico, esEstudiante, esFuncionario, esAdmin, esGuardia };