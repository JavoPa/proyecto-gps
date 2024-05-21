const Usuario = require('../models/usuario.model');
const Academico = require("../models/academico.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Administrador = require("../models/administrador.model.js");
const Guardia = require("../models/guardia.model.js");



async function crearEstudiante(aux) {
    try {
        //validar formato de los campos no obligatorios
        if (aux == undefined) return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });

        //crear Estudiante
        const usuarioNuevo = await new Estudiante({
            rut: aux.rut,
            nombre: aux.nombre,
            apellido: aux.apellido,
            fono: aux.fono,
            correo: aux.correo,
            password: await Usuario.encryptPassword(aux.password),
            rol: aux.rol,
            carrera: aux.carrera,
            situacion_academica: aux.situacion_academica
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearGuardia(aux) {
    try {
        //validar formato de los campos no obligatorios
        if (aux == undefined) return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });

        const usuarioNuevo = await new Guardia({
            rut: aux.rut,
            nombre: aux.nombre,
            apellido: aux.apellido,
            fono: aux.fono,
            correo: aux.correo,
            password: await Usuario.encryptPassword(aux.password),
            rol: aux.rol,
            cargo: aux.cargo,
            situacion_laboral: aux.situacion_laboral
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearAcademico(aux) {
    try {
        //validar formato de los campos no obligatorios

        if (aux == undefined) return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });

        const usuarioNuevo =await  new Academico({
            rut: aux.rut,
            nombre: aux.nombre,
            apellido: aux.apellido,
            fono: aux.fono,
            correo: aux.correo,
            password: await Usuario.encryptPassword(aux.password),
            rol: aux.rol,
            cargo: aux.cargo,
            area: aux.area,
            situacion_laboral: aux.situacion_laboral
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearFuncionario(aux) {
    try {

        //validar formato de los campos no obligatorios
        if (aux == undefined) return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });
        const usuarioNuevo = await new Funcionario({
            rut: aux.rut,
            nombre: aux.nombre,
            apellido: aux.apellido,
            fono: aux.fono,
            correo: aux.correo,
            password: await Usuario.encryptPassword(aux.password),
            rol: aux.rol,
            situacion_laboral: aux.situacion_laboral,
            departamento: aux.departamento,
            cargo: aux.cargo
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearAdministrador(aux) {
    try {
        //validar formato de los campos no obligatorios
        if (aux == undefined) return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });
        const usuarioNuevo = await new Administrador({
            rut: aux.rut,
            nombre: aux.nombre,
            apellido: aux.apellido,
            fono: aux.fono,
            correo: aux.correo,
            password: await Usuario.encryptPassword(aux.password),
            rol: aux.rol,
            cargo: aux.cargo,
            departamento: aux.departamento
        }).save();
        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    crearEstudiante,
    crearGuardia,
    crearAcademico,
    crearFuncionario,
    crearAdministrador
}

