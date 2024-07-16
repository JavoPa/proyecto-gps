import { StyleSheet } from 'react-native';
import { registerForPushNotificationsAsync } from '@/utils/notifications';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';
import { useSession } from '@/flo';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function TabOneScreen() {
  const { signOut, session, isLoading} = useSession();
  const router = useRouter();
  //funcion signIn
  const signIn = () => {
    return router.replace('/login');
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
