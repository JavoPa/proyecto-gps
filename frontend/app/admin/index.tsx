import { StyleSheet } from 'react-native';
import { useSession } from '@/flo';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';

export default function TabOneScreen() {
    const { signOut } = useSession();
    return (
      <View style={styles.container}>
        <Text style={styles.title} >¡Bienvenido Admin!</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Button title="Salir" onPress={()=>signOut()} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="app/admin/index.tsx" />
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