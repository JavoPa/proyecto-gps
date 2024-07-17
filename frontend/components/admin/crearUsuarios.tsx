import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable , ScrollView, Button, Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import validarRut from "@/services/validar.service"

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
    //const [Tipo2, setTipo2] = useState('Tipo');
    const [situacion, setSituacion] = useState('Situacion');
    //const [situacion2, setSituacion2] = useState('Situacion');
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [encontrado, setencontrado] = useState(false);

    

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
    /*
    const situacionLabel = () => {
        if (situacion || isFocus2) {
          return (
            <Text>
              Situacion acutal
            </Text>
          );
        }
        return null;
    };*/

    const handleCrear = () => {
        if(encontrado){
          //crear usuario con los datos encontrados
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
          console.log(datos);
        }else{
          //crear usuario con los datos ingresados
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
          console.log(datos);
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
        console.log(datos);
    }
  
    const handleVerificar = async () => {
      //formatear rut para enviarlo bien
      const resp = await validarRut(rut);
      if(resp != null){
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
        setNombre2('Nombre');
        setApellido2('Apellido');
        setNumero2('Numero de telefono');
        setCorreo2('Correo');
        setPassword2('Contraseña');
        setTipo('Tipo');
        setSituacion('Situacion');
        Alert.alert('Usuario no encontrado', 'Desea crear un nuevo usuario?');
      }
    }
   

    return(
        <ScrollView style={styles.a}>
            <Text style={styles.texto} >Crear Usuarios</Text>
            <TextInput style={styles.input} placeholder={rut2} inputMode= 'numeric' onChangeText={setRut}></TextInput>
            <Button title= 'Buscar Intranet' onPress={handleVerificar}></Button>
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
                value={situacion}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                    setSituacion(item.value);
                    setIsFocus2(false);
                }}
            />
            <Button title= 'Crear' onPress={handleCrear}></Button>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    a: {
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
        marginRight: 60,
        marginLeft: 60,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1.5,
        textAlign: 'center',
    },
    texto:{
      fontSize: 20,
      color: '#000',
      padding: 10,
    }
  });

export default CrearUsuarios;