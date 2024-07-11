import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import GestionarHorarios from '@/components/admin/gestionarHorarios';

export default function HorariosScreen() {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>Horarios Activo Bicicletero</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <GestionarHorarios/>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        padding: 16,
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
});
