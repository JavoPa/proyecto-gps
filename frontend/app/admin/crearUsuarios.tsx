import { StyleSheet } from 'react-native';
import React from 'react';
import Crear from '@/components/admin/crearUsuarios';
import { Text, View } from '@/components/Themed';

export default function ListaScreen() {
  return (
    <View style={styles.container}>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Crear/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDF2F4'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});