import { StyleSheet, TouchableOpacity } from 'react-native';
import ListaGuardias from '@/components/admin/listaGuardias';
import { Text, View } from '@/components/Themed';
import CrearGuardia from '@/components/admin/crearGuardia';
import React, { useState } from 'react';

export default function ListaScreen() {
  const [mostrarCrearGuardia, setMostrarCrearGuardia] = useState(false);
  return (
    <View style={styles.container}>
      {mostrarCrearGuardia ? (
        <View>
        <CrearGuardia />
        <TouchableOpacity style={styles.button} onPress={() => setMostrarCrearGuardia(false)}>
          <Text style={styles.buttonTitle}>Volver</Text>
        </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={() => setMostrarCrearGuardia(true)}>
            <Text style={styles.buttonTitle}>Crear Guardia</Text>
          </TouchableOpacity>
          <ListaGuardias />
        </>
      )}
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
  button: {
    backgroundColor: '#2A628F',
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
  },
});