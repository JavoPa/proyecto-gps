import React, { useState,useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable , ScrollView, Button, Alert, Modal, Platform} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import validarRut from "@/services/validar.service"
import { useRouter } from 'expo-router';
import { CrearUsuario } from '@/services/crear.Usuarios';




const data = [
    {label: 'Academico', value: 'Academico'},
    {label: 'Estudiante', value: 'Estudiante'},
    {label: 'Funcionario', value: 'Funcionario'},
    {label: 'Administrador', value: 'Administrador'},
];

const data2 = [
    {label: 'Regular', value: 'Regular'},
    {label: 'Titulado', value: 'Titulado'},
    {label: 'Retirado', value: 'Retirado'},
    {label: 'Egresado', value: 'Egresado'},
];

const data3 = [
  {label: 'Ingeniería Civil Informática', value: 'Ingenieria Civil Informatica'},
  {label: 'Ingeniería Civil Industrial', value: 'Ingeniería Civil Industrial'},
  {label: 'Ingeniería Civil', value: 'Ingeniería Civil'},
  {label: 'Ingeniería Ejecucion en informatica y Computación', value: 'Ingeniería Ejecucion en informatica y Computación'},
  {label: 'Ingeniería Civil en Electrica', value: 'Ingeniería Civil en Electrica'},
  {label: 'Ingeniería Civil en Automatizacion', value: 'Ingeniería Civil en Automatizacion'},
  {label: 'Ingeniería Civil en Mecánica', value: 'Ingeniería Civil en Mecánica'},
  {label: 'Ingeniería Civil en Química', value: 'Ingeniería Civil en Química'},
  {label: 'Ingeniería Ejecucion Electrica', value: 'Ingeniería Ejecucion Electrica'},
  {label: 'Ingeniería Ejecucion Mecanica', value: 'Ingeniería Ejecucion Mecanica'},
  {label: 'Ingeniería Comercial', value: 'Ingeniería Comercial'},
  {label: 'Ingeniería Construccion', value: 'Ingeniería Construccion'},
  {label: 'Diseño Industrial', value: 'Diseño Industrial'},
  {label: '_Arquitectura', value: '_Arquitectura'},
  {label: 'Trabajo Social', value: 'Trabajo Social'},
  {label: 'Ingenieria Estadistica', value: 'Ingenieria Estadistica'},
  {label: 'Bachillerato en ciencias', value: 'Bachillerato en ciencias'},
];

const data4 = [
  {label: 'Contratado', value: 'Contratado'},
  {label: 'Planta', value: 'Planta'},
  {label: 'Honorario', value: 'Honorario'},
];




const CrearUsuarios: React.FC = () =>{
    
    const [rut,setRut] = useState('rut');
    const [rut2,setRut2] = useState('rut');
    const [nombre, setNombre] = useState('Nombre');
    const [nombre2, setNombre2] = useState('Nombre');
    const [apellido, setApellido] = useState('Apellido');
    const [apellido2, setApellido2] = useState('Apellido');
    const [numero,setNumero] = useState('Numero de telefono');
    const [numero2,setNumero2] = useState('Numero de telefono');
    const [correo,setCorreo] = useState('Correo');
    const [correo2,setCorreo2] = useState('Correo');
    const [password,setPassword] = useState('Contraseña');
    const [password2,setPassword2] = useState('Contraseña');
    const [Tipo, setTipo] = useState('Tipo');
    const [carrera, setCarrera] = useState('Carrera');
    const [situacion, setSituacion] = useState('Situacion');
    const [isFocus, setIsFocus] = useState(false);
    const [encontrado, setencontrado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const router = useRouter();

    const formatearRut = (rut: string) => {
      const limpio = rut.replace(/\D/g, '');
      const formateado = limpio.replace(/^(\d{7,8})(\d)$/, '$1-$2').slice(0, 10);
      return formateado;
    }

    useEffect(() => {
      setRut(formatearRut(rut));
    },[rut]);


    const tipoLabel = () => {
        if (Tipo || isFocus) {
          return (
            <Text>
              Tipo de usuario
            </Text>
          );
        }
        return null;
    };

    const setear = () => {
        setRut('rut');
        setRut2('rut');
        setNombre('Nombre');
        setNombre2('Nombre');
        setApellido('Apellido');
        setApellido2('Apellido');
        setNumero('Numero de telefono');
        setNumero2('Numero de telefono');
        setCorreo('Correo');
        setCorreo2('Correo');
        setPassword('Contraseña');
        setPassword2('Contraseña');
        setTipo('Tipo');
        setSituacion('Situacion');
        setCarrera('Carrera');
    }

    const handleCrear = async () => {
      
              
        if(encontrado){
          //crear usuario con los datos encontrados
          if(Tipo == 'Estudiante'){
            const datos = {
              rut: rut2,
              nombre: nombre2,
              apellido: apellido2,
              fono: numero2,
              correo: correo2,
              password: password,
              rol: Tipo,
              situacion: situacion,
              carrera: carrera,
            }
            //madar datos a funcion de crear usuario
            CrearUsuario(datos).then((respuesta) => {
              if(respuesta){
                if(respuesta.message != undefined){
                  if(Platform.OS === 'web'){
                    alert(`${respuesta.message}`);
                    setear();
                  }else{
                    Alert.alert(`${nombre} ${apellido}`,`${respuesta.message}`,[{text: 'OK' , onPress: () => setear()}]);
                  }
                }
              }
            });
          
          }else{
            const datos = {
              rut: rut2,
              nombre: nombre2,
              apellido: apellido2,
              fono: numero2,
              correo: correo2,
              password: password,
              rol: Tipo,
              situacion: situacion,
            }
            //madar datos a funcion de crear usuario
            CrearUsuario(datos).then((respuesta) => {
              if(respuesta.message != undefined){
                if(respuesta){
                  if(respuesta.message != undefined){
                    if(Platform.OS === 'web'){
                      alert(`${respuesta.message}`);
                      setear();
                    }else{
                      Alert.alert(`${nombre} ${apellido}`,`${respuesta.message}`,[{text: 'OK' , onPress: () => setear()}]);
                    }
                  }
                }
              }
            });
          }  
        }else{
          //crear usuario con los datos ingresados
          if(Tipo == "Estudiante"){
            
            const datos = {
              rut: rut,
              nombre: nombre,
              apellido: apellido,
              fono: numero,
              correo: correo,
              password: password,
              rol: Tipo,
              situacion: situacion,
              carrera: carrera,
            }
            //madar datos a funcion de crear usuario
            CrearUsuario(datos).then((respuesta) => {
              if(respuesta){
                if(respuesta.message != undefined){
                  if(Platform.OS === 'web'){
                    alert(`${respuesta.message}`);
                    setear();
                  }else{
                    Alert.alert(`${nombre} ${apellido}`,`${respuesta.message}`,[{text: 'OK' , onPress: () => setear()}]);
                  }
                }
              }
            });
          }else{
            const datos = {
              rut: rut,
              nombre: nombre,
              apellido: apellido,
              fono: numero,
              correo: correo,
              password: password,
              rol: Tipo,
              situacion: situacion,
            }
            //madar datos a funcion de crear usuario
            CrearUsuario(datos).then((respuesta) => {
              if(respuesta){
                if(respuesta.message != undefined){
                  //console.log(respuesta.message);
                  if(Platform.OS === 'web'){
                    alert(`${respuesta.message}`);
                    setear();
                  }else{
                    Alert.alert(`${nombre} ${apellido}`,`${respuesta.message}`,[{text: 'OK' , onPress: () => setear()}]);
                  }
                 
                }
              }
            });
          }
          
        }
        setear();

    }

    
  
    const handleVerificar = async () => {
      
      setCargando(true);
      setRut2(formatearRut(rut));
      const resp = await validarRut(rut);
      if(resp != null){
        setCargando(false);
        setencontrado(true);
        setRut2(resp.rut);
        setNombre2(resp.nombre);
        setApellido2(resp.apellido);
        setNumero2(resp.fono.toString());
        setCorreo2(resp.correo);
        setPassword(resp.password);
        setPassword2(resp.password);
        //setPassword2(resp.password);
        if(resp.__t == 'Academico' || resp.__t == 'Funcionario' || resp.__t == 'Estudiante' || resp.__t == 'Administrador'){
          setTipo(resp.__t);
        }
       
        if(resp.__t == 'Estudiante'){
          
          if(data3.some(e => e.value === resp.carrera)){
            const carrera = resp.carrera;
            console.log(carrera);
            setCarrera(carrera);
          }
          if(resp.situacion_academica== 'Regular' || resp.situacion_academica== 'Egresado'){
            const situacion = resp.situacion_academica;
            //console.log(carrera);
            setSituacion(situacion);
            console.log(carrera);
          }
        }else{
          if(resp.situacion_laboral== 'Planta' || resp.situacion_laboral == 'Contratado' || resp.situacion_laboral == 'Honorario'){
            const situacion = resp.situacion_laboral;
            setSituacion(situacion);
          }
        }
        console.log(password,password2);
      }else{
        setCargando(false);
        setNombre2('Nombre');
        setApellido2('Apellido');
        setNumero2('Numero de telefono');
        setCorreo2('Correo');
        setPassword2('Contraseña');
        setSituacion('Situacion');
        //setRut2('Rut');
      }
      setCargando(false);
    }

   

    return(
        <View style={styles.pagina}>
            <Text style={styles.texto}>Crear Usuario</Text>
            <Dropdown
                data={data}
                style={styles.inputCrear}
                labelField="label"
                valueField="value"
                placeholder={"Seleccione el Tipo de Usuario a crear"}
                value={Tipo}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setTipo(item.value);
                    setIsFocus(false);
                }}
            />
            {/*Modal para vista de cargando */}
            <Modal
                animationType="none"
                transparent={false}
                visible={cargando}
                onRequestClose={() => {
                    setCargando(!cargando);
                }}
            >
                <View style={styles.vistaCargando}>
                  <Text>Cargando...</Text>
                  <Text>Espera Un Segundo..</Text>

                </View>
            </Modal>

             {/*Seleccion adicionales de datos para estudiante */}
            <Modal
              visible={Tipo == 'Estudiante'}
              animationType="none"
              transparent={true}
              onRequestClose={() => {}} //para que no se cierre con el boton de atras
            >
              <View style={styles.modalEstudiante}>
                <View style={styles.detalle}>
                  <Text style={styles.texto} >Crear Estudiante</Text>
                  <ScrollView >
                    <View style={styles.vistaRutIntranet}>
                      <TextInput style={styles.rut} placeholder={rut2} inputMode= 'numeric' onChangeText={setRut}></TextInput>
                      <Pressable onPress={handleVerificar} style={styles.boton} onTouchEnd={()=>setRut2(rut)}>
                          <Text style={styles.modalButtonText}>Buscar Intranet</Text>
                      </Pressable>
                    </View>
                    <TextInput style={styles.input} placeholder={nombre2} onTouchEnd={()=>setRut2(rut)} onChangeText={setNombre}></TextInput>
                    <TextInput style={styles.input} placeholder={apellido2}  onChangeText={setApellido}></TextInput>
                    <TextInput style={styles.input} placeholder={numero2} inputMode= 'numeric' onChangeText={setNumero} ></TextInput>
                    <TextInput style={styles.input} placeholder={correo2} inputMode= 'email' onChangeText={setCorreo}></TextInput>
                    <TextInput style={styles.input} placeholder={password2} secureTextEntry={true} onChangeText={setPassword}></TextInput>
                    {tipoLabel()}
                    <Dropdown
                        data={data}
                        style={styles.input}
                        labelField="label"
                        valueField="value"
                        placeholder={"Seleccione el Tipo de usuario"}
                        value={Tipo}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setTipo(item.value);
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown
                        data={data2}
                        style={styles.input}
                        labelField="label"
                        valueField="value"
                        placeholder={"Ingrese la Situacion Academica"}
                        value={situacion}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSituacion(item.value);
                            setIsFocus(false);
                        }}
                    />
                    <Dropdown
                        data={data3}
                        style={styles.input}
                        labelField="label"
                        valueField="value"
                        placeholder={"Seleccione una Carrera"}
                        value={carrera}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setCarrera(item.value);
                            setIsFocus(false);
                        }}
                    />
                    <View style={styles.modalButtonContainer}>
                      <Pressable style={styles.modalButton} onPress={handleCrear}>
                            <Text style={styles.modalButtonText}>Crear</Text>
                        </Pressable>
                      <Pressable style={styles.modalButton} onPress={()=>{setear()}}>
                            <Text style={styles.modalButtonText}>Volver</Text>
                      </Pressable>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {/*Creacion otros usuarios que no sean estudiante */}
            <Modal
              visible={Tipo == 'Academico' || Tipo == 'Funcionario' || Tipo == 'Administrador'}
              animationType="none"
              transparent={true}
              onRequestClose={() => {}} //para que no se cierre con el boton de atras
            >
             
              <View style={styles.modalEstudiante}>
                  <View style={styles.detalle}>
                    <Text style={styles.texto} >Crear {Tipo}</Text>
                    <ScrollView >
                      <View style={styles.vistaRutIntranet}>
                        <TextInput style={styles.rut} placeholder={rut2} inputMode= 'numeric' onChangeText={setRut} ></TextInput>
                        <Pressable onPress={handleVerificar} style={styles.boton}>
                            <Text style={styles.modalButtonText}>Buscar Intranet</Text>
                        </Pressable>
                      </View>
                      <TextInput style={styles.input} placeholder={nombre2} onChangeText={setNombre} onTouchEnd={()=>setRut2(rut)} ></TextInput>
                      <TextInput style={styles.input} placeholder={apellido2}  onChangeText={setApellido}></TextInput>
                      <TextInput style={styles.input} placeholder={numero2}  inputMode= 'numeric' onChangeText={setNumero} ></TextInput>
                      <TextInput style={styles.input} placeholder={correo2} inputMode= 'email' onChangeText={setCorreo}></TextInput>
                      <TextInput style={styles.input} placeholder={password2} secureTextEntry onChangeText={setPassword}></TextInput>
                      {tipoLabel()}
                      <Dropdown
                          data={data}
                          style={styles.input}
                          labelField="label"
                          valueField="value"
                          placeholder={"Tipo de usuario"}
                          value={Tipo}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                              setTipo(item.value);
                              setIsFocus(false);
                          }}
                      />
                      <Dropdown
                          data={data4}
                          style={styles.input}
                          labelField="label"
                          valueField="value"
                          placeholder={"Seleccione una Situacion laboral"}
                          value={situacion}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                              setSituacion(item.value);
                              setIsFocus(false);
                          }}
                      />
                      <View style={styles.modalButtonContainer}>
                        <Pressable style={styles.modalButton} onPress={handleCrear}>
                            <Text style={styles.modalButtonText}>Crear</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={()=>{setTipo('Tipo'),setRut2('Rut')}}>
                            <Text style={styles.modalButtonText}>Volver</Text>
                        </Pressable>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    vistaScroll: {
        width: "80%",
    },
    pagina: {
      flex: 1,
      padding: 16,
      backgroundColor: '#EDF2F4',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    inputCrear: {
      height: 40,
      width: '90%',
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
      borderRadius: 4,
      backgroundColor: '#FFFFFF', 
    },
    input: {
      height: 40,
      width: 'auto',
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
      borderRadius: 4,
      backgroundColor: '#FFFFFF', 
    },
    boton: {
        backgroundColor: '#2A628F',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        margin: 5,
    },
    texto:{
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#13293D',
      textAlign: 'center',
    },
    vistaRutIntranet:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    rut:{
      width: '50%',
      padding: 10,
      margin:6,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    botonCrear: {
      backgroundColor: '#fff',
      borderRadius: 5,
      borderColor: '#000',
      borderWidth: 2,
      padding: 10,
      marginLeft:'25%',
      marginRight:'25%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
    },
    vistaCargando: {
      backgroundColor: '#000',
      padding: 40,
      marginTop: '80%',
      marginLeft: '20%',
      marginRight: '20%',
      alignItems: 'center',
      borderRadius: 10,
    },
    modalEstudiante: {
      flex: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detalle : {
      width: '90%',
      maxWidth: 600,
      backgroundColor: '#EDF2F4', // Fondo del modal
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    modalButtonContainer: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#EDF2F4',
    },
    modalButton: {
      backgroundColor: '#2A628F', // Color de los botones del modal
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#FFFFFF', // Color del texto de los botones del modal
      fontSize: 16,
    },
  });

export default CrearUsuarios;