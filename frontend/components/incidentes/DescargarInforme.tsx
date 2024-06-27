import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { getIncidentesInforme } from '@/services/incidentes.service';
import * as FileSystem from 'expo-file-system';  // Make sure you have installed expo-file-system if you are using Expo

const DescargarInforme: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const downloadInforme = async () => {
    setLoading(true);
    try {
      const response = await getIncidentesInforme();
      if (response.status === 200) {
        const uri = FileSystem.documentDirectory + 'informe_incidentes.pdf';
        await FileSystem.writeAsStringAsync(uri, response.data, { encoding: FileSystem.EncodingType.Base64 });
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
    <Button
      title={loading ? 'Descargando...' : 'Descargar Informe'}
      onPress={downloadInforme}
      disabled={loading}
    />
  );
};

export default DescargarInforme;
