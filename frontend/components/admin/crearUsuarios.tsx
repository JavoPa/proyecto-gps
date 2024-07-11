import React from 'react'
import { StyleSheet, View, Text} from 'react-native';

const crearUsuarios:  React.FC = () =>{
  return (
    <View style={styles.container}>
        <Text style={styles.title}>...Pronto Disponible...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
  },
  title: {
      fontSize: 24,
      color: 'white',
  }
});

export default crearUsuarios;

