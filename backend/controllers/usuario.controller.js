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
const INTRANET_API = require('../config/env.config');  
const { get } = require('mongoose');

const Usuario = require('../models/usuario.model');
const {
    crearEstudiante,
    crearUser,
    crearAdministrador,
    crearAcademico,
    crearFuncionario,
} = require('../services/usuario.service');

const axios = require('axios');
const {
    rutSchema,
    estudianteSchema,
    academicoSchema,
    funcionarioSchema,
    guardiaSchema,
    administradorSchema,
    nombreSchema,
    apellidoSchema,
    fonoSchema,
    passwordSchema
} = require('../schema/usuario.schema');
const { enviarPushNotification, enviarNotifSingular } = require("../utils/notifHandler.js");


async function verificarIntranet(req,res) {
    try {
        const { rut } = req.body;
        const {error} = rutSchema.validate({rut: rut});
        console.log(error);
        if(error) return res.status(400).json({message: "El rut no es valido"});

        // conectar con la api validar que el usuario este creado y obtener los datos para crearlo
        const aux = await axios.get(INTRANET_API,{
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


/*
data = {
    "tipo": "Estudiante",
    "rut": "12345678-9",
    "nombre": "Juan",
    "apellido": "Perez",
    "fono": "12345678",
    "correo": "h@ubb.cl",
    "password": "12345678",
    "rol": "Estudiante",
    ... datos especificos de cada tipo de usuario...

}
*/

async function crearUsuario(req,res) {
    try {
        const { body } = req;
        //validar campo Tipo
        // {rol: ""}
        if(body.rol == null) return res.status(400).json({message: "El campo tipo es obligatorio"});
        //console.log(body);
        //validar campos obligatorios
        
        //validar si el usuario ya existe
        const usuario = await Usuario.findOne({rut: body.rut});
        if(usuario) return res.status(400).json({message: "El usuario ya existe"});
        const usuario2 = await Usuario.findOne({correo: body.correo});
        if(usuario2) {
            return res.status(400).json({message: "Un usuario ya usa ese correo"});
        }
        //validar tipo de usuario a crear
        if(body.rol == "Estudiante"){

            const {error} = estudianteSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: error.details[0].message});

            const nuevoEstudiante = crearEstudiante(body);

            return res.status(200).json({message: "Usuario creado correctamente"});
        }
        if(body.rol == "Administrador"){

            const {error} = administradorSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: error.details[0].message});

            const nuevoAdministrador = crearAdministrador(body);
            return res.status(200).json({message: "Usuario creado correctamente"});
        }
        if(body.rol == "Guardia"){

            const {error} = guardiaSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json(error.details);

            const nuevoGuardia = crearGuardia(body);
            return res.status(200).json({message: "Usuario creado correctamente"});
        }

        if(body.rol == "Academico"){

            const {error} = academicoSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: error.details[0].message});

            const nuevoAcademico = crearAcademico(body);
            return res.status(200).json({message: "Usuario creado correctamente"});
        }

        if(body.rol == "Funcionario"){

            const {error} = funcionarioSchema.validate(body);
            console.log(error);
            if(error) return res.status(400).json({message: error.details[0].message});

            const nuevoFuncionario = crearFuncionario(body);
            return res.status(200).json({message: "Usuario creado correctamente"});
        }


        return res.status(400).json({message: "Tipo de usuario no encontrado, verifique los datos ingresados"});
        
    } catch (error) {
        console.log(error);
    }
}

async function eliminarUsuario(req, res) {
    try {
        const { id } = req.params;
        const eliminar = await Usuario.findByIdAndDelete(id);
        console.log(eliminar);
        if(!eliminar) return res.status(400).json({message: "No se pudo eliminar el usuario"});
        return res.status(200).json({message: "Usuario eliminado correctamente"});

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
            .select('-password') // Excluir el campo de contraseña
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

async function enviarNotif(req, res) {
    const { tokens, message } = req.body;
    try {
        const tickets = await enviarNotifSingular(tokens, message);
        res.status(200).json({ tickets });
    } catch (error) {
        console.error('Error al enviar notificación push:', error);
        res.status(500).json({ message: 'No se pudo enviar la notificación' });
    }
}

async function editarUsuario(req, res) {
    try {
        const { id } = req.params;
        let { body } = req;
       
        let data = {};
        
        if(body.nombre != ''){
            const {error} = nombreSchema.validate({nombre: body.nombre});
            if(error) return res.status(400).json({message: error.details[0].message});
            data.nombre = body.nombre;
        }
        if(body.apellido != ''){
            const {error} = apellidoSchema.validate({apellido: body.apellido});
            if(error) return res.status(400).json({message: error.details[0].message});
            data.apellido = body.apellido;
        }
        if(body.fono != ''){
            const {error} = fonoSchema.validate({fono: body.fono});
            if(error) return res.status(400).json({message: error.details[0].message});
            data.fono = body.fono;
        }
        if(body.correo != ''){
            data.correo = body.correo;
            const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
            if(!emailRegex.test(body.correo)){
                return res.status(400).json({message: "Correo no valido"});
            }
        }
        if(body.password != ''){
            const {error} = passwordSchema.validate({password: body.password});
            if(error) return res.status(400).json({message: error.details[0].message});
            data.password = body.password;
        }

        const usuario = await Usuario.findByIdAndUpdate(id, data,  { new: true });
        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado.' });
        }
        return res.status(200).json({message: "Actualizado correctamente"});
        
    }catch (error) {
        console.error('Error al editar usuario', error);
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
    verificarIntranet,
    eliminarUsuario,
    enviarNotif,
    editarUsuario
};