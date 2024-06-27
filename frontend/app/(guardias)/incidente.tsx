import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import IncidentesInfo from '@/components/incidentes/MostrarIncidentes';  // Adjust the path as necessary
import DownloadInformeButton from '@/components/incidentes/DescargarInforme';  // Adjust the path as necessary

export default function IncidentesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Incidentes</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <IncidentesInfo />
      <DownloadInformeButton />
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