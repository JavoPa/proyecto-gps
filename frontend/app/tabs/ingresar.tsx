
import { StyleSheet } from 'react-native';

import TokenInfo from '@/components/usuario/TokenInfo2';
import { Text, View } from '@/components/Themed';

export default function IngresarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Bicicleta Se Encuentra</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TokenInfo />
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
