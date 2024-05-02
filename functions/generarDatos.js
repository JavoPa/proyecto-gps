
const { faker } = require('@faker-js/faker');
const {Roles, Carreras, Areas, Situacion_Laboral, Situacion_Academica} = require('../constant/constantes');
const {validarRut} = require('../config/validarRut.js');

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
        Datos.push(Situacion_Laboral[Math.floor(Math.random()*Situacion_Laboral.length)]);
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
    return Datos;
 }

module.exports = {generarDatos}