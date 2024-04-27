const Usuario = require('../models/usuario.model');
const Academico = require("../models/academico.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Administrador = require("../models/administrador.model.js");
const Guardia = require("../models/guardia.model.js");



async function crearEstudiante(aux) {
    try {
        //validar formato de los campos no obligatorios

        //crear Estudiante
        const usuarioNuevo = new Estudiante({
            rut: body.rut,
            nombre: body.nombre,
            apellido: body.apellido,
            fono: body.fono,
            correo: body.correo,
            password: Usuario.encryptPassword(body.password),
            rol: body.rol,
            carrera: body.carrera,
            situacion_academica: body.situacion_academica
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearGuardia(aux) {
    try {
        //validar formato de los campos no obligatorios

        const usuarioNuevo = new Guardia({
            rut: body.rut,
            nombre: body.nombre,
            apellido: body.apellido,
            fono: body.fono,
            correo: body.correo,
            password: Usuario.encryptPassword(body.password),
            rol: body.rol,
            cargo: body.cargo,
            situacion_laboral: body.situacion_laboral
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearAcademico(aux) {
    try {
        //validar formato de los campos no obligatorios

        const usuarioNuevo = new Academico({
            rut: body.rut,
            nombre: body.nombre,
            apellido: body.apellido,
            fono: body.fono,
            correo: body.correo,
            password: Usuario.encryptPassword(body.password),
            rol: body.rol,
            cargo: body.cargo,
            area: body.area,
            situacion_laboral: body.situacion_laboral
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearFuncionario(aux) {
    try {

        //validar formato de los campos no obligatorios

        const usuarioNuevo = new Funcionario({
            rut: body.rut,
            nombre: body.nombre,
            apellido: body.apellido,
            fono: body.fono,
            correo: body.correo,
            password: Usuario.encryptPassword(body.password),
            rol: body.rol,
            situacion_laboral: body.situacion_laboral,
            departamento: body.departamento,
            cargo: body.cargo
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}

async function crearAdministrador(aux) {
    try {
        //validar formato de los campos no obligatorios

        const usuarioNuevo = new Administrador({
            rut: body.rut,
            nombre: body.nombre,
            apellido: body.apellido,
            fono: body.fono,
            correo: body.correo,
            password: Usuario.encryptPassword(body.password),
            rol: body.rol,
            cargo: body.cargo,
            departamento: body.departamento
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