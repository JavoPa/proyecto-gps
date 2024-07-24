
import { StyleSheet } from 'react-native';

import HomeScreen from '@/components/usuario/HomeScreen';
import { Text, View } from '@/components/Themed';
import { useSession } from '@/flo';
import { Button } from 'react-native';

export default function TabOneScreen() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={()=>signOut()}>BIENVENIDO AL BICICLETERO UBB</Text>
      <Button title="Salir" onPress={()=>signOut()} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <HomeScreen />
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
    margin: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
