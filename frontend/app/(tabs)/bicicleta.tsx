import { StyleSheet } from 'react-native';

import BicicletaInfo from '@/components/usuario/BicicletaInfo';
import { Text, View } from '@/components/Themed';

export default function BicicletaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Bicicleta</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <BicicletaInfo />
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
