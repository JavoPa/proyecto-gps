import React, { useState } from 'react';
import { Button, Alert, View } from 'react-native';
import { getIncidentesInforme } from '@/services/incidentes.service';
import * as FileSystem from 'expo-file-system';  // Make sure you have installed expo-file-system if you are using Expo

// Falta: recibir el pdf en formato base64

interface DescargarInformeProps {
  navigateTo: (component: string) => void;
}

const DescargarInforme: React.FC<DescargarInformeProps> = ({ navigateTo }) => {
  const [loading, setLoading] = useState(false);

  const downloadInforme = async () => {
    setLoading(true);
    try {
      const year = '2024';
      const month = '5';
      const response = await getIncidentesInforme(year, month); // Pass "fecha" as a parameter to the API call
      console.log(response);

      if (response.status === 200) {
        const uri = FileSystem.documentDirectory + `informe_incidentes.pdf`;
        console.log(response.data);
        await FileSystem.writeAsStringAsync(uri, response.data, { encoding: FileSystem.EncodingType.UTF8 });
        Alert.alert('Informe descargado', `El informe se ha descargado correctamente en ${uri}`);
      } else {
        Alert.alert('Error', response.message || 'No se pudo descargar el informe');
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Ocurrió un error al intentar descargar el informe');
      } else {
        Alert.alert('Error', 'Ocurrió un error desconocido al intentar descargar el informe');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title="Volver al menú de incidentes" onPress={() => navigateTo('IncidentesMenu')} />
      <Button
        title={loading ? 'Descargando...' : 'Descargar Informe'}
        onPress={downloadInforme}
        disabled={loading}
      />
    </View>
  );
};

export default DescargarInforme;
