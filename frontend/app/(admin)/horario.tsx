import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Card from '../../components/Card';
import { getHorarios } from '@/services/horario.service';

export default function HorariosScreen() {
  const [horarios, setHorarios] = useState({ limiteEntrada: '', limiteSalida: '' });

  useEffect(() => {
      async function fetchHorarios() {
          const data = await getHorarios();
          setHorarios(data);
      }

      fetchHorarios();
  }, []);

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Horarios Activo Bicicletero</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.cardsContainer}>
              <Card title="Hora Entrada" time={horarios.limiteEntrada} />
              <Card title="Hora Salida" time={horarios.limiteSalida} />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
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
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
