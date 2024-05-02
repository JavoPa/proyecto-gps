
//poblar base de datos con usuarios ficticios
const Funcionario = require('../models/funcionario.model');
const Estudiante = require('../models/estudiante.model');
const Academico = require('../models/academico.model');
const Administrador = require('../models/administrador.model');
const User = require('../models/user.models.js');
const {generarDatos} = require('../functions/generarDatos.js');
const fs = require('fs');

async function poblarBD(cantidad){
    try {

        // base de datos esta vacia
        const consulta = await User.find({});

        if(consulta.length > 0){
            return console.log("Base de datos ya tiene datos");
        }

        // crear n de usuarios
        for(let i = 0; i < cantidad; i++){
            //genera datos azar
            const datos = generarDatos();
            //console.log(`Entre valor i : ${i}`);
            //crea usuario por tipo
            if(datos[9] == "estudiante"){
                const est = await new Estudiante({
                    rut: datos[0],
                    nombre: datos[1],
                    apellido: datos[2],
                    fecha_nacimiento: datos[3],
                    Direccion: datos[4],
                    fono: datos[5],
                    correo: datos[6],
                    password: datos[7],
                    Genero: datos[8],
                    Rol: datos[9],
                    carrera: datos[10],
                    Facultad: datos[11],
                    Fecha_ingreso: datos[12],
                    situacion_academica: datos[13]
                }).save();
                fs.appendFile("Datos.txt", est.rut + "\n", (err) => {
                    if (err) throw err;
                    console.log("Datos guardados");
                });
                //console.log(est);
            }
            if(datos[9]== "funcionario"){
                const fun = await new Funcionario({
                    rut: datos[0],
                    nombre: datos[1],
                    apellido: datos[2],
                    fecha_nacimiento: datos[3],
                    Direccion: datos[4],
                    fono: datos[5],
                    correo: datos[6],
                    password: datos[7],
                    Genero: datos[8],
                    Rol: datos[9],
                    situacion_laboral: datos[10],
                    departamento: datos[11],
                    cargo: datos[12],
                    jefatura: datos[13],
                    anexo: datos[14],
                    oficina: datos[15]
                }).save();
                fs.appendFile("Datos.txt", fun.rut + "\n", (err) => {
                    if (err) throw err;
                    console.log("Datos guardados");
                });
                //console.log(fun);
            }

            if(datos[9]== "academico"){
                const aca = await new Academico({
                    rut: datos[0],
                    nombre: datos[1],
                    apellido: datos[2],
                    fecha_nacimiento: datos[3],
                    Direccion: datos[4],
                    fono: datos[5],
                    correo: datos[6],
                    password: datos[7],
                    Genero: datos[8],
                    Rol: datos[9],
                    cargo: datos[10],
                    area: datos[11],
                    jefatura: datos[12],
                    anexo: datos[13],
                    oficina: datos[14],
                    situacion_laboral: datos[15]
                }).save();
                fs.appendFile("Datos.txt", aca.rut + "\n", (err) => {
                    if (err) throw err;
                    console.log("Datos guardados");
                });
                //console.log(aca);
            }

            if(datos[9]== "administrador"){
                const admin = await new Administrador({
                    rut: datos[0],
                    nombre: datos[1],
                    apellido: datos[2],
                    fecha_nacimiento: datos[3],
                    Direccion: datos[4],
                    fono: datos[5],
                    correo: datos[6],
                    password: datos[7],
                    Genero: datos[8],
                    Rol: datos[9],
                    cargo: datos[10],
                    departamento: datos[11],
                    jefatura: datos[12],
                    anexo: datos[13],
                    oficina: datos[14]
                }).save();
                fs.appendFile("Datos.txt", admin.rut + "\n", (err) => {
                    if (err) throw err;
                    console.log("Datos guardados");
                });
                //console.log(admin);
            }
        }
        
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {poblarBD}