import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button, ScrollView, Pressable} from 'react-native';
import validarRut from "@/services/validar.service"
import CrearUsuarios from './crearUsuarios';
import { Link, Redirect } from 'expo-router';

const validarUsuarios:  React.FC = () =>{
  const [rut, setRut] = useState('');

  const handleBuscar = async () => {
    //si rut exite en la base de datos, enviar como props a crear usuario los datos para crearlo
    //si no, mostrar formulario para crear usuario
    const resp = await validarRut(rut);
    console.log(resp);
    if(resp != null){
      //setRut(rut);
    }else{
      
    }
  }

  return (
    <View >
      <TextInput placeholder='Rut'  inputMode= 'numeric' style={styles.input} onChangeText={setRut} ></TextInput>
      <Pressable onPress={handleBuscar}>
        <Text>Buscar</Text>
      </Pressable>
    </View>
  );
 
}


const styles = StyleSheet.create({
  title: {
      fontSize: 24,
      color: 'white',
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 20,
    padding:10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  a:{
    borderColor: 'white',
    borderWidth: 1,
    padding: 40
  }
});

export default validarUsuarios;

