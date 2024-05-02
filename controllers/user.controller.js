

const Usuario = require('../models/user.models.js');
const validar = require('../config/validarRut.js');


async function obtenerUsuarios(req,res){
    try {
        console.log("Dentro de obtener");
        const rut = req.body.rut;
        // validar formato rut
        //12345678-9
        var tDato = typeof(rut);
        if(tDato != 'string' || rut.length < 9 || rut.length > 10 || rut.indexOf('-') == -1 || rut.indexOf('.') != -1){
            return res.status(400).json({message: 'Formato de rut incorrecto'})
        }
        //valida rut
        var rutAux = rut.split('-');
        var digito = validar.validarRut(rutAux[0]);
        if(rutAux[1] != digito){
            return res.status(400).json({message: 'Rut incorrecto'})
        }
        //buscar usuario
        const usuario = await Usuario.findOne({rut});
        if(!usuario){
            return res.status(404).json({message: 'Usuario no existe en la base de datos'});
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    obtenerUsuarios
}