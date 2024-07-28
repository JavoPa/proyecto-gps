import { StyleSheet } from 'react-native';

import ValidarInfo from '@/components/guardia/ValidarInfo';
import { Text, View } from '@/components/Themed';

export default function IngresoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Usuario Manualmente</Text>
      <View style={styles.separator} />
      <ValidarInfo />
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
