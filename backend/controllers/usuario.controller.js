"use strict";

const Academico = require("../models/academico.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Administrador = require("../models/administrador.model.js");
const Guardia = require("../models/guardia.model.js");
const { userIdSchema } = require("../schema/usuario.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const usuarioService = require('../services/usuario.service');
const { get } = require('mongoose');

const Usuario = require('../models/usuario.model');
const {
    crearEstudiante,
    crearAcademico,
    crearAdministrador,
    crearFuncionario,
    crearGuardia
} = require('../services/usuario.service');

const axios = require('axios');
const {rutSchema,estudianteSchema,academicoSchema,funcionarioSchema,guardiaSchema,administradorSchema} = require('../schema/usuario.schema')


async function verificarIntranet(req,res) {
    try {
        const { rut } = req.body;
        const {error} = rutSchema.validate({rut: rut});
        console.log(error);
        if(error) return res.status(400).json({message: "El rut no es valido"});

        // conectar con la api validar que el usuario este creado y obtener los datos para crearlo
        const aux = await axios.get('http://localhost:5000/api/users/obtener',{
            data:{
                "rut": rut
            }
        }).catch((error) => {
            console.log(error.code);
            return res.status(404).json({message: "Usuario no encontrado"});
        });

        const usuario = aux.data;

        if(!usuario){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        return res.status(200).json(usuario);

    } catch (error) {
        console.log(error);
    }
}


async function crearUsuario(req,res) {
    try {
        const { body } = req;
        //validar campo Tipo
        // {tipo: ""}
        if(body.tipo == null) return res.status(400).json({message: "El campo tipo es obligatorio"});

        //validar campos obligatorios

        //validar si el usuario ya existe
        const usuario = await Usuario.findOne({rut: body.rut});
        if(usuario) return res.status(400).json({message: "El usuario ya existe"});

        //validar tipo de usuario a crear
        if(body.tipo == "Estudiante"){

            const {error} = estudianteSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: "Campos no validos"});

            const nuevoEstudiante = crearEstudiante(body);

            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoEstudiante);
        }

        if(body.tipo == "Guardia"){

            const {error} = guardiaSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: "Campos no validos"});

            const nuevoGuardia = crearGuardia(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoGuardia);
        }

        if(body.tipo == "Academico"){

            const {error} = academicoSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: "Campos no validos"});

            const nuevoAcademico = crearAcademico(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoAcademico);
        }

        if(body.tipo == "Funcionario"){

            const {error} = funcionarioSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: "Campos no validos"});

            const nuevoFuncionario = crearFuncionario(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoFuncionario);
        }

        if(body.tipo == "Administrador"){

            const {error} = administradorSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: "Campos no validos"});

            const nuevoAdministrador = crearAdministrador(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoAdministrador);
        }

        return res.status(400).json({message: "Tipo de usuario no encontrado, verifique los datos ingresados"});
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * Obtener detalles de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const { error: idError } = userIdSchema.validate({ id });
        if (idError) return respondError(req, res, 400, idError.message);
    
        const [user, userError] = await usuarioService.getUserById(id);
        if (userError) return respondError(req, res, 500, userError);
        if(!user) return respondError(req, res, 400, 'No se obtuvo el usuario');
        respondSuccess(req, res, 201, user);
    } catch (error) {
        handleError(error, "usuario.controller -> getUserById");
        respondError(req, res, 500, "No se pudo obtener el usuario");
    }
}

async function indexUsuariosConBicicleta(req, res) {
    try {
        const usuariosConBicicletas = await Usuario.find({ bicicleta: { $ne: null } })
            .select('nombre apellido rut')  
            .populate('bicicleta', 'identificador'); 

        res.status(200).json(usuariosConBicicletas);
    } catch (error) {
        console.error('Error al obtener usuarios con bicicletas', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}


async function getUsuario(req, res) {
    try {
        const usuario = await Usuario.findById(req.params.id)
            .populate('bicicleta');
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

async function getUsuarios(req, res) {
    try {
        const usuario = await Usuario.find();
        if (!usuario) { return res.status(404).send({ message: 'No hay usuarios' }); }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).send({ message: 'Error al procesar la solicitud' });
    }
}

module.exports = {
    crearUsuario,
    getUserById,
    indexUsuariosConBicicleta,
    getUsuario,
    getUsuarios,
    crearUsuario,
    verificarIntranet
};