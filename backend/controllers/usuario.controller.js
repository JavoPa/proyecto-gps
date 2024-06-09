
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

module.exports = {
    crearUsuario,
    verificarIntranet
};