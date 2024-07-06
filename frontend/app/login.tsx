import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, {useState} from 'react';
import { Redirect } from 'expo-router';

import { Text, View } from '@/components/Themed';

import { useSession } from '@/flo';

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn , session } = useSession();

    const handleLogin =  () => {
      try {
        const data = {
          correo: email,
          password: password
        }
        signIn(data);
        if(session != null){
          //dividir por roles
          //modificar backend para que devulva el rol en ves de la cookie
          return <Redirect href="/(tabs)" />;
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Error al iniciar sesión, vuelva a intentarlo');
      }
    };

    return (
      
      <View style={styles.container}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Iniciar" onPress={handleLogin} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    label: {
      marginBottom: 10,
      fontSize: 16,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
  });