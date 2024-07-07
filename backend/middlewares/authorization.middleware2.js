
const Academico = require("../models/academico.model.js");
const Guardia = require("../models/guardia.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Administrador = require("../models/administrador.model.js");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/env.config.js");

async function esAcademico(req,res,next) {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
  
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).send({ message: "No hay token valido" });
        }
    
        const token = authHeader.split(" ")[1];
        const deco = jwt.decode(token, JWT_SECRET,true);

        const academicoAux = await Academico.findOne({ correo: deco.correo });
        if(academicoAux == null){
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
        
        if(academicoAux.rol === "academico") {
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
        const authHeader = req.headers.authorization || req.headers.Authorization;
  
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).send({ message: "No hay token valido" });
        }
    
        const token = authHeader.split(" ")[1];
        const deco = jwt.decode(token, JWT_SECRET,true);

        const estudianteAux = await Estudiante.findOne({ correo: deco.correo });

        if(esEstudiante == null){
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }

        if(estudianteAux.rol === "Estudiante") {
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
        const authHeader = req.headers.authorization || req.headers.Authorization;
  
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).send({ message: "No hay token valido" });
        }
    
        const token = authHeader.split(" ")[1];
        const deco = jwt.decode(token, JWT_SECRET,true);

        const funcionarioAux = await Funcionario.findOne({ correo: deco.correo });

        if(funcionarioAux == null){
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }

        if(funcionarioAux.rol === "Funcionario") {
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
        const authHeader = req.headers.authorization || req.headers.Authorization;
  
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).send({ message: "No hay token valido" });
        }
    
        const token = authHeader.split(" ")[1];
        const deco = jwt.decode(token, JWT_SECRET,true);

        const adminAux = await Administrador.findOne({ correo: deco.correo });

        if(adminAux == null){
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }

        if(adminAux.rol === "Administrador") {
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
        
        const authHeader = req.headers.authorization || req.headers.Authorization;
  
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).send({ message: "No hay token valido" });
        }
    
        const token = authHeader.split(" ")[1];
        const deco = jwt.decode(token, JWT_SECRET,true);
        
        const guardiaAux = await Guardia.findOne({ correo: deco.correo });

        if(guardiaAux == null){
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
        
        if(guardiaAux.rol === "Guardia") {
            next();
            console.log("es Guardia");
            return
        } else {
            console.log("no es Guardia");
            return res.status(403).send({ message: "Usuario no autorizado!!" });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { esAcademico, esEstudiante, esFuncionario, esAdmin, esGuardia };
