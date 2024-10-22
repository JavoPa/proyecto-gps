
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
                rol: "academico",
                cargo: "Academico",
                area: "x",
                situacion: "Contrato"
            }).save();
            console.log("Academico inicial creado Exitosamente!!");
        }
        if (E.length == 0) {
            await new Estudiante({
                rut : "20720552-4",
                nombre: "Bayron",
                apellido: "Garri",
                fono: "965874540",
                correo: "bayron@ubb.cl", 
                password: await Usuario.encryptPassword("Bayron123"), 
                rol: "estudiante",
                carrera: "Informatica",
                situacion: "Regular"
            }).save();

            const estudianteJavier = await new Estudiante({
                rut : "20738483-2",
                nombre: "Esteban",
                apellido: "Rojas",
                fono: "918938273",
                correo: "esteban@ubb.cl", 
                password: await Usuario.encryptPassword("Esteban123"), 
                rol: "estudiante",
                carrera: "Informatica",
                situacion: "Regular"
            }).save();

            await new Estudiante({
                rut : "9787456-5",
                nombre: "Javier",
                apellido: "Placencia",
                fono: "915895773",
                correo: "javier@ubb.cl", 
                password: await Usuario.encryptPassword("Javier123"), 
                rol: "estudiante",
                carrera: "Informatica",
                situacion: "Regular"
            }).save();
            console.log("Estudiantes creados Exitosamente!!");
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
            console.log("Funcionarios creados Exitosamente!!");
        }
        if (Ad.length == 0) {
            await new Administrador({
                rut : "11111111-4",
                nombre: "Administrador",
                apellido: "Admin",
                fono: "123456789",
                correo: "admin@ubb.cl", 
                password: await Usuario.encryptPassword("Admin123"), 
                rol: "Administrador",
                cargo: "Presidente",
                departamento: "Fisica",
            }).save();

            await new Administrador({
                rut : "15660760-6",
                nombre: "Sebastian",
                apellido: "Espinoza",
                fono: "912345678",
                correo: "sebastian@ubb.cl", 
                password: await Usuario.encryptPassword("Sebastian123"), 
                rol: "Administrador",
                cargo: "Jefe de Informatica",
                departamento: "Ciencias Empresariales"
            }).save();

            console.log("Administradores creados Exitosamente!!");

        }
        if (G.length == 0) {
            const guardiTomas = await new Guardia({
                rut : "19511677-6",
                nombre: "Matias",
                apellido: "Navea",
                fono: "123456789",
                correo: "mnavea@ubb.cl", 
                password: await Usuario.encryptPassword("Mnavea123"), 
                rol: "Guardia",
                cargo: "Guardia",
                situacion_laboral: "Vigente"
            }).save();

            await new Guardia({
                rut : "21198754-5",
                nombre: "Sergio",
                apellido: "Morales",
                fono: "987654321",
                correo: "sergio@ubb.cl", 
                password: await Usuario.encryptPassword("Sergio123"), 
                rol: "Guardia",
                cargo: "Guardia",
                situacion_laboral: "Vigente"
            }).save();

            const guardiaJavier = await new Guardia({
                rut : "10027342-2",
                nombre: "Gerardo",
                apellido: "Gutierrez",
                fono: "984327564",
                correo: "gerardo@ubb.cl", 
                password: await Usuario.encryptPassword("Gerardo123"), 
                rol: "Guardia",
                cargo: "Guardia",
                situacion_laboral: "Vigente"
            }).save();

            console.log("Guardias creados Exitosamente!!");

            const jaulaJavier = await new Jaula({
                ubicacion: "https://www.google.com/maps/search/?api=1&query=Aulas%27AC%27UBB",
                capacidad: 1,
                identificador: "EST-AULAS-AA",
                guardiaAsignado: guardiaJavier._id ? guardiaJavier._id : null
            }).save();
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = createUser;