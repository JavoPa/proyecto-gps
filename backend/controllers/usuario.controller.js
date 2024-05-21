
const Usuario = require('../models/usuario.model');
const {
    crearEstudiante,
    crearAcademico,
    crearAdministrador,
    crearFuncionario,
    crearGuardia
} = require('../services/usuario.service');

const axios = require('axios');


async function preCreacion(req,res) {
    try {
        const { rut } = req.body;
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

        //consultar si existe el usuario

        if(usuario.Rol == "estudiante"){
            const Datos = {
                "rut": usuario.rut,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "fono": usuario.fono,
                "correo": usuario.correo,
                "password": usuario.password,
                "rol": usuario.Rol,
                "carrera": usuario.carrera,
                "situacion_academica": usuario.situacion_academica
            }
            const nuevoEstudiante = await crearEstudiante(Datos);
            return res.status(200).send(nuevoEstudiante);

        }
        if(usuario.Rol == "academico"){
            const Datos = {
                "rut": usuario.rut,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "fono": usuario.fono,
                "correo": usuario.correo,
                "password": usuario.password,
                "rol": usuario.Rol,
                "cargo": usuario.cargo,
                "area": usuario.area,
                "situacion_laboral": usuario.situacion_laboral
            
            }

            const nuevoAcademico = await crearAcademico(Datos);
            return res.status(200).send(nuevoAcademico);
        }
        if(usuario.Rol == "administrador"){
            const Datos = {
                "rut": usuario.rut,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "fono": usuario.fono,
                "correo": usuario.correo,
                "password": usuario.password,
                "rol": usuario.Rol,
                "cargo": usuario.cargo,
                "departamento": usuario.departamento
            }

            const nuevoAdministrador = await crearAdministrador(Datos);
            return res.status(200).send(nuevoAdministrador);
            
        }
        if(usuario.Rol == "funcionario"){
            const Datos = {
                "rut": usuario.rut,
                "nombre": usuario.nombre,
                "apellido": usuario.apellido,
                "fono": usuario.fono,
                "correo": usuario.correo,
                "password": usuario.password,
                "rol": usuario.Rol,
                "situacion_laboral": usuario.situacion_laboral,
                "departamento": usuario.departamento,
                "cargo": usuario.cargo
            }

            const nuevoFuncionario = await crearFuncionario(Datos);
            return res.status(200).send(nuevoFuncionario);
            
        }

        // segun el caso
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


            const nuevoEstudiante = crearEstudiante(body);

            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoEstudiante);
        }

        if(body.tipo == "Guardia"){
            const nuevoGuardia = crearGuardia(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoGuardia);
        }

        if(body.tipo == "Academico"){
            const nuevoAcademico = crearAcademico(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoAcademico);
        }

        if(body.tipo == "Funcionario"){
            const nuevoFuncionario = crearFuncionario(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoFuncionario);
        }

        if(body.tipo == "Administrador"){
            const nuevoAdministrador = crearAdministrador(body);
            return res.status(200).json({message: "Usuario creado correctamente"}, nuevoAdministrador);
        }

        return res.status(400).json({message: "Tipo de usuario no encontrado, verifique los datos ingresados"});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    crearUsuario,
    preCreacion
};