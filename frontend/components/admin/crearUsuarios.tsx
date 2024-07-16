import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable , ScrollView, Button} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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



const CrearUsuarios:  React.FC = () =>{
    console.log();
    const [rut,setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numero,setNumero] = useState('');
    const [correo,setCorreo] = useState('');
    const [password,setPassword] = useState('');
    const [Tipo, setTipo] = useState('');
    const [situacion, setSituacion] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);

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
    const situacionLabel = () => {
        if (situacion || isFocus2) {
          return (
            <Text>
              Situacion acutal
            </Text>
          );
        }
        return null;
    };

    const handleCrear = () => {
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
   

    return(
        <ScrollView style={styles.a}>
            <Text style={styles.texto} >Crear Usuarios</Text>
            <TextInput style={styles.input} placeholder='Rut' inputMode= 'numeric' onChangeText={setRut}></TextInput>
            <TextInput style={styles.input} placeholder='Nombre' onChangeText={setNombre}></TextInput>
            <TextInput style={styles.input} placeholder='Apellido'  onChangeText={setApellido}></TextInput>
            <TextInput style={styles.input} placeholder='Numero de telefono' inputMode= 'tel' onChangeText={setNumero} ></TextInput>
            <TextInput style={styles.input} placeholder='Correo' inputMode= 'email' onChangeText={setCorreo}></TextInput>
            <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry onChangeText={setPassword}></TextInput>
            {tipoLabel()}
            <Dropdown
                data={data}
                style={styles.input}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Tipo' : '...'}
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
                placeholder={!isFocus ? 'Tipo' : '...'}
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