import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable , ScrollView, Button, Alert, Modal} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import validarRut from "@/services/validar.service"
import { useRouter } from 'expo-router';

const data = [
    {label: 'Academico', value: 'Academico'},
    {label: 'Estudiante', value: 'Estudiante'},
    {label: 'Funcionrio', value: 'Funcionrio'},
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
    //const [situacion2, setSituacion2] = useState('Situacion');
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
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

    const handleCrear = () => {
        
        if(encontrado){
          //crear usuario con los datos encontrados
          if(Tipo == 'Estudiante'){
            const datos = {
              rut: rut2,
              nombre: nombre2,
              apellido: apellido2,
              telefono: numero2,
              correo: correo2,
              contraseña: password,
              tipo: Tipo,
              situacion: situacion,
              carrera: carrera,
            }
            //madar datos a funcion de crear usuario
            console.log(datos);
            return router.replace('/admin');
          }
          const datos = {
            rut: rut2,
            nombre: nombre2,
            apellido: apellido2,
            telefono: numero2,
            correo: correo2,
            contraseña: password,
            tipo: Tipo,
            situacion: situacion,
          }
          //madar datos a funcion de crear usuario
          console.log(datos);
          return router.replace('/admin');
        }else{
          //crear usuario con los datos ingresados
          if(Tipo == 'Estudiante'){
            const datos = {
              rut: rut,
              nombre: nombre,
              apellido: apellido,
              telefono: numero,
              correo: correo,
              contraseña: password,
              tipo: Tipo,
              situacion: situacion,
              carrera: carrera,
            }
            //madar datos a funcion de crear usuario
            console.log(datos);
            return router.replace('/admin');
          }
          const datos = {
            rut: rut,
            nombre: nombre,
            apellido: apellido,
            telefono: numero,
            correo: correo,
            contraseña: password,
            tipo: Tipo,
            situacion: situacion,
          }
          //madar datos a funcion de crear usuario
          console.log(datos);
          return router.replace('/admin');
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
        setTipo('Tipo');
        setSituacion('Situacion');
      }
      setCargando(false);
    }
   

    return(
        <ScrollView style={styles.vistaScroll}>
            <Text style={styles.texto} >Crear Usuarios</Text>
            <View style={styles.vistaRutIntranet}>
              <TextInput style={styles.rut} placeholder={rut2} inputMode= 'numeric' onChangeText={setRut}></TextInput>
              <Pressable onPress={handleVerificar} style={styles.boton}>
                  <Text>Buscar Intranet</Text>
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
            {}
            <Dropdown
                data={data2}
                style={styles.input}
                labelField="label"
                valueField="value"
                placeholder={situacion}
                value={situacion}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                    setSituacion(item.value);
                    setIsFocus2(false);
                }}
            />
            <Pressable style={styles.botonCrear} onPress={handleCrear}>
                <Text>Crear</Text>
            </Pressable>
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
                <Text style={styles.texto}>Datos Adicionales Estudiante</Text>
                <Dropdown
                  data={data3}
                  style={styles.input}
                  labelField="label"
                  valueField="value"
                  placeholder={carrera}
                  value={carrera}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={item => {
                      setCarrera(item.value);
                      setIsFocus2(false);
                  }}
                />
                <Pressable style={styles.botonCrear} onPress={handleCrear}>
                  <Text>Crear Estudiante</Text>
                </Pressable>
              </View>
            </Modal>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    vistaScroll: {
        width: "80%",
    },
    input: {
      height: 40,
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
    },
    boton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderColor: '#000',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        margin: 5,
    },
    texto:{
      fontSize: 20,
      color: '#000',
      padding: 10,
    },
    vistaRutIntranet:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    rut:{
      width: '58%',
      padding: 10,
      margin:5,
      borderWidth: 2,
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
      marginLeft:50,
      marginRight:50,
      alignItems: 'center',
      justifyContent: 'center',
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
      backgroundColor: '#a25',
      marginTop: '60%',
      padding: 40,
      marginLeft: '5%',
      marginRight: '5%',
      borderRadius: 10,
    }
  });

export default CrearUsuarios;