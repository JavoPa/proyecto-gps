import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Button } from 'react-native';
import { useSession } from '@/flo';

export default function TabOneScreen() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Tab Ones</Text>
      <Button title="Salir" onPress={()=>signOut()} color="#2A628F"/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/tabs/index.tsx" />
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
