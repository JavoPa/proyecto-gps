
const Academico = require("../models/academico.model.js");
const Estudiante = require("../models/estudiante.model.js");
const Funcionario = require("../models/funcionario.model.js");
const Administrador = require("../models/administrador.model.js");
const Guardia = require("../models/guardia.model.js");
const Usuario = require("../models/usuario.model.js");
const Jaula = require("../models/jaula.model.js");

async function createUser() {
    try {
        const A = await Academico.find({});
        const E = await Estudiante.find({});
        const F = await Funcionario.find({});
        const Ad = await Administrador.find({});
        const G = await Guardia.find({});
        const J = await Jaula.find({});


    

        if (A.length == 0) {
            await new Academico({
                rut : "11111111-1",
                nombre: "Academico",
                apellido: "A",
                fono: "123456789",
                correo: "academico@ubb.cl", 
                password: await Usuario.encryptPassword("Academico123"), 
                rol: "Academico",
                cargo: "Academico",
                area: "x",
                situacion: "Contrato"
            }).save();
            console.log("Academico inicial creado Exitosamente!!");
        }
        if (E.length == 0) {
            await new Estudiante({
                rut : "11111111-2",
                nombre: "Estudiante",
                apellido: "E",
                fono: "123456789",
                correo: "estudiante@ubb.cl", 
                password: await Usuario.encryptPassword("Estudiante123"), 
                rol: "Estudiante",
                carrera: "Informatica",
                situacion: "Regular"
            }).save();
            console.log("Estudiante inicial creado Exitosamente!!");

            await new Estudiante({
                rut : "20738483-2",
                nombre: "Esteban",
                apellido: "Rojas",
                fono: "918938273",
                correo: "esteban@ubb.cl", 
                password: await Usuario.encryptPassword("Esteban123"), 
                rol: "Estudiante",
                carrera: "Informatica",
                situacion: "Regular"
            }).save();
        }
        if (F.length == 0) {
            await new Funcionario({
                rut : "11111111-3",
                nombre: "Funcionario",
                apellido: "F",
                fono: "123456789",
                correo: "funcionario@ubb.cl", 
                password: await Usuario.encryptPassword("Funcionario123"), 
                rol: "funcionario",
                situacion: "Contrato",
                departamento: "Y",
                cargo: "X"
            }).save();
            console.log("Funcionario inicial creado Exitosamente!!");
        }
        if (Ad.length == 0) {
            await new Administrador({
                rut : "11111111-4",
                nombre: "Administrador ",
                apellido: "Admin",
                fono: "123456789",
                correo: "admin@ubb.cl", 
                password: await Usuario.encryptPassword("Admin123"), 
                rol: "Administrador",
                cargo: "x",
                departamento: "y",
            }).save();
            console.log("Administrador inicial creado Exitosamente!!");
        }
        if (G.length == 0) {
            await new Guardia({
                rut : "11111111-5",
                nombre: "Guardia",
                apellido: "G",
                fono: "123456789",
                correo: "guardia@ubb.cl", 
                password: await Usuario.encryptPassword("Guardia123"), 
                rol: "Guardia",
                cargo: "x",
                situacion_laboral: "Contratado"
            }).save();
            console.log("Guardia inicial creado Exitosamente!!");

            const guardiaJavier = await new Guardia({
                rut : "11111111-5",
                nombre: "Gerardo",
                apellido: "Gutierrez",
                fono: "984327564",
                correo: "gerardo@ubb.cl", 
                password: await Usuario.encryptPassword("Gerardo123"), 
                rol: "Guardia",
                cargo: "x",
                situacion_laboral: "Vigente"
            }).save();
            await new Jaula({
                ubicacion: "Estacionamiento FACE",
                capacidad: 1,
                identificador: "EST-FACE",
                guardiaAsignado: guardiaJavier._id ? guardiaJavier._id : null
            }).save();
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = createUser;