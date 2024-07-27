
import { StyleSheet, Dimensions } from 'react-native';

import Historial from '@/components/usuario/Historial';
import { Text, View } from '@/components/Themed';

export default function HistorialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Historial</Text>
      <Historial />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width > 600 ? 32 : 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#13293D',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
