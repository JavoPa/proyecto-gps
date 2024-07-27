import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable , ScrollView, Button, Alert, Modal} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import validarRut from "@/services/validar.service"
import { useRouter } from 'expo-router';
import { CrearUsuario } from '@/services/crear.Usuarios';
import { max } from 'date-fns';


const data = [
    {label: 'Academico', value: 'Academico'},
    {label: 'Estudiante', value: 'Estudiante'},
    {label: 'Funcionario', value: 'Funcionario'},
    {label: 'Administrador', value: 'Administrador'},
];

const data2 = [
    {label: 'Regular', value: 'Regular'},
    {label: 'Irregular', value: 'Irregular'},
];

const data3 = [
  {label: 'ICINF', value: 'Ingenieria Civil Informatica'},
  {label: 'IECI', value: 'Ingenieria En Ejecucion Informatica'},
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
    const [isFocus2, setIsFocus2] = useState(false);
    const [aniquilar, setAniquilar] = useState(false);
    const [encontrado, setencontrado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const router = useRouter();

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
        setNombre('Nombre');
        setApellido('Apellido');
        setNumero('Numero de telefono');
        setCorreo('Correo');
        setPassword('Contraseña');
        setTipo('Tipo');
        setSituacion('Situacion');
        setCarrera('Carrera');
    }

    const handleCrear = async () => {

        //validar datos
        
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
            const respuesta =  CrearUsuario(datos);
            Alert.alert(`${respuesta}`);
            setear();
            console.log(respuesta);
          }
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
          const respuesta =  CrearUsuario(datos);
          Alert.alert(`${respuesta}`);
          setear();
          console.log(respuesta);
        }else{
          //crear usuario con los datos ingresados
          if(Tipo == "Estudiante"){
            console.log("entrw")
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
              console.log(respuesta.message);
              Alert.alert(`${nombre} ${apellido}`,`${respuesta.message}`);
              setear();
            });
          }/*
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
          const respuesta =  CrearUsuario(datos);
          console.log(respuesta);
          setear();
          Alert.alert(`${respuesta}`);*/
        }

    }
  
    const handleVerificar = async () => {
      //no permite entrada vacia
      if(rut == 'rut'){
        Alert.alert('No se admite Rut vacio', 'Ingrese un rut valido para buscar');
      }
      setCargando(true);
      const resp = await validarRut(rut);
      console.log(resp);
      if(resp != null){
        setCargando(false);
        setencontrado(true);
        setRut2(resp.rut);
        setNombre2(resp.nombre);
        setApellido2(resp.apellido);
        setNumero2(resp.fono.toString());
        setCorreo2(resp.correo);
        //setPassword2(resp.password);
        if(resp.__t == 'Academico' || resp.__t == 'Funcionario' || resp.__t == 'Estudiante' || resp.__t == 'Administrador'){
          setTipo(resp.__t);
        }
        if(resp.situacion == 'Regular' || resp.situacion == 'Irregular'){
          setSituacion(resp.situacion);
        }
      }else{
        setCargando(false);
        setNombre2('Nombre');
        setApellido2('Apellido');
        setNumero2('Numero de telefono');
        setCorreo2('Correo');
        setPassword2('Contraseña');
        setSituacion('Situacion');
      }
      setCargando(false);
    }

   

    return(
        <View style={styles.pagina}>
            <Text style={styles.texto}>Crear Usuario</Text>
            <Dropdown
                data={data}
                style={styles.input}
                labelField="label"
                valueField="value"
                placeholder={Tipo}
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
                animationType="slide"
                transparent={true}
                visible={cargando}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
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
              animationType="slide"
              transparent={false}
              onRequestClose={() => {}} //para que no se cierre con el boton de atras
            >
              <View style={styles.modalEstudiante}>
                <View style={styles.detalle}>
                  <Text style={styles.texto} >Crear Estudiante</Text>
                  <ScrollView >
                    <View style={styles.vistaRutIntranet}>
                      <TextInput style={styles.rut} placeholder={rut2} inputMode= 'numeric' onChangeText={setRut}></TextInput>
                      <Pressable onPress={handleVerificar} style={styles.boton}>
                          <Text style={styles.modalButtonText}>Buscar Intranet</Text>
                      </Pressable>
                    </View>
                    <TextInput style={styles.input} placeholder={nombre2} onChangeText={setNombre}></TextInput>
                    <TextInput style={styles.input} placeholder={apellido2}  onChangeText={setApellido}></TextInput>
                    <TextInput style={styles.input} placeholder={numero2}  onChangeText={setNumero} ></TextInput>
                    <TextInput style={styles.input} placeholder={correo2} inputMode= 'email' onChangeText={setCorreo}></TextInput>
                    <TextInput style={styles.input} placeholder={password2} secureTextEntry onChangeText={setPassword}></TextInput>
                    {tipoLabel()}
                    <Dropdown
                        data={data}
                        style={styles.input}
                        labelField="label"
                        valueField="value"
                        placeholder={Tipo}
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
                        placeholder={situacion}
                        value={Tipo}
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
                        placeholder={carrera}
                        value={Tipo}
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
                      <Pressable style={styles.modalButton} onPress={()=>setTipo('Tipo')}>
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
              animationType="slide"
              transparent={false}
              onRequestClose={() => {}} //para que no se cierre con el boton de atras
            >
             
              <View style={styles.modalEstudiante}>
                  <View style={styles.detalle}>
                    <Text style={styles.texto} >Crear {Tipo}</Text>
                    <ScrollView >
                      <View style={styles.vistaRutIntranet}>
                        <TextInput style={styles.rut} placeholder={rut2} inputMode= 'numeric' onChangeText={setRut}></TextInput>
                        <Pressable onPress={handleVerificar} style={styles.boton}>
                            <Text style={styles.modalButtonText}>Buscar Intranet</Text>
                        </Pressable>
                      </View>
                      <TextInput style={styles.input} placeholder={nombre2} onChangeText={setNombre}></TextInput>
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
                          placeholder={Tipo}
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
                          placeholder={situacion}
                          value={Tipo}
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
                        <Pressable style={styles.modalButton} onPress={()=>setTipo('Tipo')}>
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
    },
    input: {
      height: 40,
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
      backgroundColor: '#f15',
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