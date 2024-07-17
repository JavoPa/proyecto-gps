import { StyleSheet, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { Text, View } from '@/components/Themed';
import { useSession } from '@/flo';
import {rolesService} from '@/services/roles.service';
import { useRouter } from 'expo-router';

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, session, isLoading } = useSession();
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const data = {
          correo: email.toLowerCase(),
          password: password
        }
        signIn(data);
        if(session){
          const rol = rolesService(session);
          if(rol == "academico" || rol == "funcionario" || rol == "estudiante"){
            return router.replace('/tabs')
          }else{
            if(rol == "Guardia"){
              return router.replace('/guardias')
            }else{
              if(rol == "Administrador"){
                return router.replace('/admin')
              }else{
                if(rol == null){
                  console.log(isLoading);
                  if (!isLoading) {
                    return <Text>Cargando..</Text>;
                  }
                  //Alert.alert('Error de conexion', 'Contactese con su provedor' );
                }else{
                  Alert.alert('Usuario no autorizado', 'No tiene permisos para acceder a la aplicación' );
                }
              }
            }
          }

        }

      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Error al iniciar sesión, vuelva a intentarlo');
      }
    };

    return (
      
      <View style={styles.container}>
        <View style={styles.containeImage}>
          <Image 
            style={styles.image }
            source={require('../assets/images/ubb5.png')}
          />
        </View>
        <TextInput
          placeholder='Correo electrónico'
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Contraseña'
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={styles.boton}>
            <Text style={styles.texto}>Iniciar</Text>
        </TouchableOpacity>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      marginLeft: 20,
      marginRight: 20,
    },
    label: {
      marginBottom: 10,
      fontSize: 16,
      textAlign: 'left'
    },
    input: {
      height: 40,
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
    },
    containeImage:{
      padding: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 500,//ancho
      height: 200,//alto
      resizeMode: 'contain',
    },
    boton: {
      backgroundColor: '#fff',
      borderRadius: 5,
      marginLeft: 60,
      marginRight: 60,
      borderColor: '#000',
      borderWidth: 1.5,
    },
    texto:{
      fontSize: 20,
      color: '#000',
      textAlign: 'center',
      padding: 10,
    }
  });