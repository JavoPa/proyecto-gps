
//poblar base de datos con usuarios ficticios
const Funcionario = require('../models/funcionario.model');
const Estudiante = require('../models/estudiante.model');
const Academico = require('../models/academico.model');
const Administrador = require('../models/administrador.model');


const { faker } = require('@faker-js/faker');

const {validarRut} = require('./validarRut');

const Roles = ["estudiante", "funcionario", "academico", "administrador"];
const Carreras = 
[
    "Ingeniería Civil Informática", 
    "Ingeniería Civil Industrial", 
    "Ingeniería Civil", 
    "Ingeniería Ejecucion en informatica y Computación", 
    "Ingeniería Civil en Electrica", 
    "Ingeniería Civil en Automatizacion", 
    "Ingeniería Civil en Mecánica", 
    "Ingeniería Civil en Química", 
    "Ingeniería Ejecucion Electrica", 
    "Ingeniería Ejecucion Mecanica", 
    "Ingeniería Comercial", 
    "Ingeniería Construccion", 
    "Diseño Industrial", 
    "_Arquitectura", 
    "Trabajo Social",
    "Ingenieria Estadistica",
    "Bachillerato en ciencias"
];

const Areas = ["Informatica", "Industrial", "Civil", "Electricidad", "Automatizacion, Mecanica", "Quimica", "Comercial", "Construccion", "Diseño", "Arquitectura", "Social", "Estadistica", "Ciencias"];

const Situacion_Laboral = ["Contratado", "Planta", "Honorario"];

const Situacion_Academica = ["Regular","Egresado","Perdida de carrera","Suspendido"];

function generarDatos() {
   // usar fakerjs para crear datos ficticios y otros segun dato
   const Datos = []

   const r =(Math.floor(Math.random()*(22999999-10111112)+10111111).toString()).slice("");
   const rut = r + "-"+validarRut(r);
   const nombre = faker.person.firstName();
   const apellido = faker.person.lastName();
   const fecha_nacimiento = ( (faker.date.birthdate(options = {min: 18, max: 60, mode: 'age'}).getDay()).toString()
                            + "-" +
                            + (faker.date.birthdate(options = {min: 18, max: 60, mode: 'age'}).getMonth()+1).toString()
                           + "-" +
                           + faker.date.birthdate(options = {min: 18, max: 60, mode: 'age'}).getFullYear().toString());
   const Dirección = faker.location.streetAddress();
   const fono = Math.floor(Math.random()*(999999999-911111112)+911111111);
   const correo = faker.internet.email();
   const password = faker.internet.password();
   const Genero = faker.person.sexType();
   const rol = Roles[Math.floor(Math.random()*Roles.length)];

   Datos.push(rut, nombre, apellido,fecha_nacimiento,Dirección, fono, correo, password,Genero, rol);        
   if(Datos[9] == "estudiante"){
       Datos.push(Carreras[Math.floor(Math.random()*Carreras.length)]);
       Datos.push("Facultad de Ingenieria");
       Datos.push( (faker.date.birthdate(options = {min: 18, max: 60, mode: 'age'}).getDay()).toString()
       + "-" +
       + (faker.date.birthdate(options = {min: 18, max: 60, mode: 'age'}).getMonth()+1).toString()
       + "-" +
       + faker.date.birthdate(options = {min: 18, max: 60, mode: 'age'}).getFullYear().toString());
       Datos.push(Situacion_Academica[Math.floor(Math.random()*Situacion_Academica.length)]);
   }

   if(Datos[9]  == "funcionario"){
       Datos.push(Situacion_Laboral[Math.floor(Math.random()*situacion_laboral.length)]);
       Datos.push("Departamento de Informatica");
       Datos.push("X");
       Datos.push("Jefe de Departamento X");
       Datos.push(Math.floor(Math.random()*(419999999-411111112)+411111111));
       Datos.push("Oficina X");
   }

   if(Datos[9]  == "academico"){
       Datos.push("Profesor");
       Datos.push(Areas[Math.floor(Math.random()*Areas.length)]);
       Datos.push("Jefe de Area X");
       Datos.push(Math.floor(Math.random()*(419999999-411111112)+411111111));
       Datos.push("Oficina X");
       Datos.push(Situacion_Laboral[Math.floor(Math.random()*Situacion_Laboral.length)]);
   }

   if(Datos[9]  == "administrador"){
       Datos.push("Administrador");
       Datos.push("X");
       Datos.push("Desconocido")
       Datos.push(Math.floor(Math.random()*(419999999-411111112)+411111111))
       Datos.push("Desconocido");
   }


   return console.log(Datos);
}




async function poblarBD(){
    try {
        //genera datos azar
        const datos = generarDatos();

        //crea usuario por tipo

        if(datos[9]== "estudiante"){
            await new Estudiante({
                rut: datos[0],
                nombre: datos[1],
                apellido: datos[2],
                fecha_nacimiento: datos[3],
                direccion: datos[4],
                fono: datos[5],
                correo: datos[6],
                password: datos[7],
                genero: datos[8],
                rol: datos[9],
                carrera: datos[10],
                facultad: datos[11],
                fecha_ingreso: datos[12],
                situacion_academica: datos[13]
            }).save();
            return console.log("Estudiante creado");
        }

        if(datos[9]== "funcionario"){
            await new Funcionario({
                rut: datos[0],
                nombre: datos[1],
                apellido: datos[2],
                fecha_nacimiento: datos[3],
                direccion: datos[4],
                fono: datos[5],
                correo: datos[6],
                password: datos[7],
                genero: datos[8],
                rol: datos[9],
                situacion_laboral: datos[10],
                departamento: datos[11],
                cargo: datos[12],
                jefatura: datos[13],
                anexo: datos[14],
                oficina: datos[15]
            }).save();
            return console.log("Funcionario creado");
        }

        if(datos[9]== "academico"){
            await new Academico({
                rut: datos[0],
                nombre: datos[1],
                apellido: datos[2],
                fecha_nacimiento: datos[3],
                direccion: datos[4],
                fono: datos[5],
                correo: datos[6],
                password: datos[7],
                genero: datos[8],
                rol: datos[9],
                cargo: datos[10],
                area: datos[11],
                jefatura: datos[12],
                anexo: datos[13],
                oficina: datos[14],
                situacion_laboral: datos[15]
            }).save();
            return console.log("Academico creado");
        }

        if(datos[9]== "administrador"){
            await new Administrador({
                rut: datos[0],
                nombre: datos[1],
                apellido: datos[2],
                fecha_nacimiento: datos[3],
                direccion: datos[4],
                fono: datos[5],
                correo: datos[6],
                password: datos[7],
                genero: datos[8],
                rol: datos[9],
                cargo: datos[10],
                departamento: datos[11],
                jefatura: datos[12],
                anexo: datos[13],
                oficina: datos[14]
            }).save();
            return console.log("Administrador creado");
        }

        return console.log("Error crear usuario");
        
    } catch (error) {
        
    }
}

module.exports = {poblarBD}