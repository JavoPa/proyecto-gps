import React, { useState } from 'react';
import { View, Button, Alert, Platform, Linking, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
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
  const [selectedMonth, setSelectedMonth] = useState('7');

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
          if (Platform.OS === 'web') {
            const pdfBlob = base64ToBlob(base64PDF, 'application/pdf');
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `informe_incidentes_${selectedYear}_${selectedMonth}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            const uri = FileSystem.documentDirectory + `informe_incidentes.pdf`;
            await FileSystem.writeAsStringAsync(uri, base64PDF, { encoding: FileSystem.EncodingType.Base64 });
            openPDF(uri);
          }
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

  const base64ToBlob = (base64: string, contentType: string) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Año</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}
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
          style={styles.picker}
        >
          {months.map((month) => (
            <Picker.Item key={month.value} label={month.label} value={month.value} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={downloadAndOpenInforme} disabled={loading}>
        <Text style={styles.buttonText}>Descargar y Abrir Informe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bo} onPress={() => navigateTo('IncidentesMenu')}>
        <Text style={styles.buttonText}>Volver al menú de incidentes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF2F4',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  buttonWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#13293D',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#2A628F',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  bo: {
    backgroundColor: '#2A628F',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default DescargarInforme;
