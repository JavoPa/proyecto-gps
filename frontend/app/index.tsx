import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';
import { useSession } from '@/flo';
import { Redirect, useRouter } from 'expo-router';
import {rolesService} from '@/services/roles.service';

export default function TabOneScreen() {
  const { signOut, session, isLoading} = useSession();
  const router = useRouter();
  //funcion signIn
  const signIn = () => {
    return router.replace('/login');
  }
  //verificar token renvia
  const rol = rolesService(session);
  if(rol == "academico" || rol == "funcionario" || rol == "estudiante"){
    return <Redirect href={('/tabs')}/> // router.replace('/tabs')modificar la rediccion
  }else{
    if(rol == "Guardia"){
      return <Redirect href={('/guardias')}/> //router.replace('/guardias')
    }else{
      if(rol == "Administrador"){
        return <Redirect href={('/admin')}/> //router.replace('/admin')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} >BICICLETERO UBB</Text>
      {isLoading ? (
          <Text>Cargando...</Text> // Puedes reemplazar esto con un indicador de carga visual
        ) : !session ? (
          <Button title="Iniciar sesión" onPress={() => signIn()} />
        ) : (
          <Button title="Salir" onPress={() => signOut()} />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
