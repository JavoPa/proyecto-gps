
import { StyleSheet } from 'react-native';

import TokenInfo from '@/components/usuario/TokenInfo';
import { Text, View } from '@/components/Themed';

export default function IngresarScreen() {
  return (
    <View style={styles.container}>
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
