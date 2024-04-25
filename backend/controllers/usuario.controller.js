
const Usuario = require('../models/usuario.model');
const Academico = require("../models/academico.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Administrador = require("../models/administrador.model.js");
const Guardia = require("../models/guardia.model.js");


async function crearUsuario(req,res) {
    try {
        const { body } = req;
        //validar si el usuario ya existe
        const usuario = await Usuario.findOne({rut: body.rut});
        if(usuario) return res.status(400).json({message: "El usuario ya existe"});

        //validar campos obligatorios

        //validar tipo de usuario a crear
        if(body.tipo == "Estudiante"){
            //validar formato de los campos no obligatorios

            //crear Estudiante
            const usuarioNuevo = new Estudiante({
                rut: body.rut,
                nombre: body.nombre,
                apellido: body.apellido,
                fono: body.fono,
                correo: body.correo,
                password: body.password,
                rol: body.rol,
                carrera: body.carrera,
                situacion_academica: body.situacion_academica
            }).save();
            return res.status(200).json({message: "Usuario creado correctamente"}, usuarioNuevo);
        }

        if(body.tipo == "Guardia"){
            //validar formato de los campos no obligatorios

            const usuarioNuevo = new Guardia({
                rut: body.rut,
                nombre: body.nombre,
                apellido: body.apellido,
                fono: body.fono,
                correo: body.correo,
                password: body.password,
                rol: body.rol,
                cargo: body.cargo,
                situacion_laboral: body.situacion_laboral
            }).save();
            return res.status(200).json({message: "Usuario creado correctamente"}, usuarioNuevo);
        }

        if(body.tipo == "Academico"){
            //validar formato de los campos no obligatorios

            const usuarioNuevo = new Academico({
                rut: body.rut,
                nombre: body.nombre,
                apellido: body.apellido,
                fono: body.fono,
                correo: body.correo,
                password: body.password,
                rol: body.rol,
                cargo: body.cargo,
                area: body.area,
                situacion_laboral: body.situacion_laboral
            }).save();
            return res.status(200).json({message: "Usuario creado correctamente"}, usuarioNuevo);
        }

        if(body.tipo == "Funcionario"){
            //validar formato de los campos no obligatorios

            const usuarioNuevo = new Funcionario({
                rut: body.rut,
                nombre: body.nombre,
                apellido: body.apellido,
                fono: body.fono,
                correo: body.correo,
                password: body.password,
                rol: body.rol,
                situacion_laboral: body.situacion_laboral,
                departamento: body.departamento,
                cargo: body.cargo
            }).save();
            return res.status(200).json({message: "Usuario creado correctamente"}, usuarioNuevo);
        }

        if(body.tipo == "Administrador"){
            //validar formato de los campos no obligatorios


            const usuarioNuevo = new Administrador({
                rut: body.rut,
                nombre: body.nombre,
                apellido: body.apellido,
                fono: body.fono,
                correo: body.correo,
                password: body.password,
                rol: body.rol,
                cargo: body.cargo,
                departamento: body.departamento
            }).save();
            return res.status(200).json({message: "Usuario creado correctamente"}, usuarioNuevo);
        }

        return res.status(400).json({message: "Tipo de usuario no encontrado"});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {crearUsuario};