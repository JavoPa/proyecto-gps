import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';
import { useSession } from '@/flo';
import ListaUsuariosConBicicleta from '@/components/guardia/ListaUsuariosConBicicleta';

export default function TabOneScreen() {
  const { signOut } = useSession();

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <Button title="Salir" onPress={() => signOut()} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ListaUsuariosConBicicleta />  {/* Añade tu componente aquí */}
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
