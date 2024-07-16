import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import DateTimePickerWrapper from './DateTimePickerWrapper'; // Adjust the path accordingly
import { getIncidentesDia } from '@/services/incidentes.service'; // Adjust the path accordingly
import Colors from '@/constants/Colors';
import { formatDate } from '../../Utils';

// Listo

interface IncidentesDiaProps {
  navigateTo: (component: string) => void;
}

const IncidentesDia: React.FC<IncidentesDiaProps> = ({ navigateTo }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [incidentes, setIncidentes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFechaPicker, setShowFechaPicker] = useState(false);

  const fetchIncidentes = async () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Seleccione una fecha');
      return;
    }

    setLoading(true);
    try {
      const formattedDate = formatDate(selectedDate);
      const response = await getIncidentesDia(formattedDate);

      switch (response.status) {
        case 200:
          const incidentesData = response.data.data.map((incidente: any) => ({
            ...incidente,
            fecha: new Date(incidente.fecha),
          }));
          setIncidentes(incidentesData);
          setError(null);
          break;

        case 204:
          Alert.alert('Error', 'No hay incidentes en ese día');
          setError('Seleccione una fecha diferente');
          break;

        default:
          setError(response.message || 'No se pudieron obtener los incidentes');
          break;
      }
    } catch (error) {
      setError('Ocurrió un error al intentar obtener los incidentes');
    } finally {
      setLoading(false);
    }
  };

  const showDatePicker = () => {
    setShowFechaPicker(true);
  };

  const onDateChange = (event: any, date: Date | undefined) => {
    setShowFechaPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{formatDate(item.fecha)}</Text>
      <Text style={styles.tableCell}>{item.hora}</Text>
      <Text style={styles.tableCell}>{item.lugar}</Text>
      <Text style={styles.tableCell}>{item.tipo}</Text>
      <Text style={styles.tableCell}>{item.descripcion}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <Button title="Volver al menú de incidentes" onPress={() => navigateTo('IncidentesMenu')} />
      </View>
      <Text style={styles.label}>Selecciona una fecha</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          value={selectedDate ? formatDate(selectedDate) : ''}
          editable={false}
          placeholder="Seleccione la fecha"
        />
      </TouchableOpacity>
      {showFechaPicker && (
        <DateTimePickerWrapper
          value={selectedDate || new Date()}
          mode="date"
          onChange={onDateChange}
        />
      )}

      <Button title="Buscar Incidentes" onPress={fetchIncidentes} />

      {loading && <Text>Cargando incidentes...</Text>}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && incidentes.length > 0 && (
        <ScrollView horizontal style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
              <Text style={styles.tableHeaderText}>Hora</Text>
              <Text style={styles.tableHeaderText}>Lugar</Text>
              <Text style={styles.tableHeaderText}>Tipo</Text>
              <Text style={styles.tableHeaderText}>Descripción</Text>
            </View>
            <FlatList
              data={incidentes}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
    minWidth: 600,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.light.tint,
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    width: '20%',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center', // Center items vertically in each row
  },
  tableCell: {
    width: '20%',
    paddingHorizontal: 5,
    textAlign: 'center',
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    height: '100%', // Make sure the cell takes the full height of the row
  },
});

export default IncidentesDia;
