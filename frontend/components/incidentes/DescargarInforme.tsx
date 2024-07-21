import React, { useState } from 'react';
import { View, Button, Alert, Platform, Linking, StyleSheet, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { getIncidentesInforme } from '@/services/incidentes.service'; // Adjust the path accordingly

interface DescargarInformeProps {
  navigateTo: (component: string) => void;
}

const DescargarInforme: React.FC<DescargarInformeProps> = ({ navigateTo }) => {
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('5');

  const years = Array.from({ length: 35 }, (_, i) => (1990 + i).toString());
  const months = [
    { label: 'Enero', value: '1' },
    { label: 'Febrero', value: '2' },
    { label: 'Marzo', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Mayo', value: '5' },
    { label: 'Junio', value: '6' },
    { label: 'Julio', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Septiembre', value: '9' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];

  const downloadAndOpenInforme = async () => {
    setLoading(true);
    try {
      const response = await getIncidentesInforme(selectedYear, selectedMonth);

      switch (response.status) {
        case 200:
          const base64PDF = response.data.pdf;
          const uri = FileSystem.documentDirectory + `informe_incidentes.pdf`;
          await FileSystem.writeAsStringAsync(uri, base64PDF, { encoding: FileSystem.EncodingType.Base64 });
          openPDF(uri);
          break;

        case 204:
          Alert.alert('Error', response.message || 'No hay incidentes en esa fecha');
          break;

        default:
          Alert.alert('Error', response.message || 'No se pudo descargar el informe');
          break;
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

  const openPDF = async (uri: string) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(uri);
    } else {
      const cUri = await FileSystem.getContentUriAsync(uri);
      IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: cUri,
        flags: 1,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ margin: 10 }}>
        <Button title="Volver al menú de incidentes" onPress={() => navigateTo('IncidentesMenu')} />
      </View>
      <Text style={styles.label}>Año</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Mes</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month) => (
            <Picker.Item key={month.value} label={month.label} value={month.value} />
          ))}
        </Picker>
      </View>
      <Button title="Descargar y Abrir Informe" onPress={downloadAndOpenInforme} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default DescargarInforme;
