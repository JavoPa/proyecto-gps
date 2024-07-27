import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import GestionarHorarios from '@/components/admin/gestionarHorarios';
import { Dimensions } from 'react-native';

export default function HorariosScreen() {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>Horarios Funcionamiento Bicicletero</Text>
          {/* <View style={styles.separator}/> */}
          <GestionarHorarios/>
      </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: width > 600 ? 32 : 24,
        fontWeight: 'bold',
        // marginBottom: 16,
        // color: '#13293D',
        padding: 16,
        // fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
});
