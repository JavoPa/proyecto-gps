"use strict";
const { handleError } = require("../utils/errorHandler");
const Bicicleta = require("../models/bicicleta.model.js");
const Usuario = require('../models/usuario.model');
const Academico = require("../models/academico.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Administrador = require("../models/administrador.model.js");
const Guardia = require("../models/guardia.model.js");


async function crearUser(aux) {
    try {
        //validar formato de los campos no obligatorios
        if (aux == undefined) return res.status(400).json({ message: "El cuerpo de la solicitud no puede estar vacío" });

        //crear usuario
        const usuarioNuevo = await new Usuario({
            rut: aux.rut,
            nombre: aux.nombre,
            apellido: aux.apellido,
            fono: aux.fono,
            correo: aux.correo,
            password: await Usuario.encryptPassword(aux.password),
            rol: aux.tipo,
            situacion_academica: aux.situacion
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
            situacion: aux.situacion_laboral
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
            rol: aux.tipo,
            situacion: aux.situacion,
        }).save();
        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}


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
            situacion: aux.situacion
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
            situacion: aux.situacion
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
            situacion_laboral: aux.situacion,
        }).save();

        return usuarioNuevo;

    } catch (error) {
        console.log(error);
    }
}




/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers() {
    try {
        const usuarios = await Usuario.find();

        if (!usuarios) return [null, "No hay usuarios"];

        return [usuarios, null];
    } catch (error) {
        handleError(error, "usuario.service -> getUsuarios");
    }
}

/**
 * Obtiene los detalles del usuario por id
 * @param {string} id Id de usuario
 * @returns {Promise} Promesa con el usuario encontrado
 */
async function getUserById(id) {
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findById(id).select('-password').populate('bicicleta');
        if (!usuario) {
            return [null, 'Usuario no encontrado'];
        }
        return [usuario, null];
    }
    catch (error) {
        handleError(error, "usuario.service -> getUserById");
        return [null, error];
    }
}


module.exports = {
    getUsers,
    getUserById,
    crearUser,
    crearGuardia,
    crearAdministrador,
    crearEstudiante,
    crearFuncionario,
    crearAcademico
};
