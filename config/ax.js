

async function poblarBD(n){
    try {

        // base de datos esta vacia
        const consulta = await User.find();
        
        if(consulta.length > 0){
            return console.log("Base de datos ya tiene datos");
        }

        // crear n de usuarios
        for(let i = 0; i < n; i++){
            //genera datos azar
            const datos = generarDatos();
            
            //crea usuario por tipo
            if(datos[9]== "estudiante"){
                async function crearEstudiante(){
                    try {
                        const est = new Estudiante({
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
                        return est;
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            if(datos[9]== "funcionario"){
                console.log(datos);
                async function crearFuncionario(){
                    try {
                        const fun = new Funcionario({
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
                        return fun;
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            if(datos[9]== "academico"){
                console.log(datos);
                async function crearAcademico(){
                    try {
                        const aca = new Academico({
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
                        return aca;
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            if(datos[9]== "administrador"){
                console.log(datos);
                async function crearAdministrador(){
                    try {
                        const admin = new Administrador({
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
                        return admin
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            return console.log("Error crear usuario");
        }
        
        
    } catch (error) {
        
    }
}
