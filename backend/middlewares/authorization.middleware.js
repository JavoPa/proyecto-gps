
const Academico = require("../models/academico.model.js");
const Guardia = require("../models/guardia.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Administrador = require("../models/administrador.model.js");

async function esAcademico(req,res,next) {
    try {
        const academicoAux = await Academico.findOne({ correo: req.correo });
        if(academicoAux) {
            next();
            return
            console.log("es academico");
        } else {
            console.log("no es academico");
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
    } catch (error) {
        console.log(error);
    }
}


async function esEstudiante(req, res, next) {
    try {
        const estudianteAux = await Estudiante.findOne({ correo: req.correo });
        if(estudianteAux){
            next();
            console.log("es Estudiante");
            return
        } else {
            console.log("no es Estudiante");
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
    } catch (error) {
        console.log(error);
    }
}

async function esFuncionario(req, res, next) {
    try {
        const funcionarioAux = await Funcionario.findOne({ correo: req.correo });
        if(funcionarioAux) {
            next();
            return
            console.log("es Funcionario");
        } else {
            console.log("no es Funcionario");
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
    } catch (error) {
        console.log(error);
    }
}

async function esAdmin(req, res, next) {
    try {
        const adminAux = await Administrador.findOne({ correo: req.correo });
        if(adminAux) {
            next();
            return
            console.log("es Administrador");
        } else {
            console.log("no es Administrador");
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
    } catch (error) {
        console.log(error);
    }
}

async function esGuardia(req, res, next) {
    try {
        const guardiaAux = await Guardia.findOne({ correo: req.correo });
        if(guardiaAux){         
            next();
            return
            console.log("es Guardia");
        } else {
            console.log("no es Guardia");
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { esAcademico, esEstudiante, esFuncionario, esAdmin, esGuardia };
