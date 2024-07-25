import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import DateTimePickerWrapper from './DateTimePickerWrapper'; // Adjust the path accordingly
import { getIncidentesDia } from '@/services/incidentes.service'; // Adjust the path accordingly
import { formatDate } from '../../Utils';

interface IncidentesDiaProps {
  navigateTo: (component: string) => void;
}

const IncidentesDia: React.FC<IncidentesDiaProps> = ({ navigateTo }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [incidentes, setIncidentes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIncidente, setSelectedIncidente] = useState<any | null>(null);

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

  const handleViewDetails = (incidente: any) => {
    setSelectedIncidente(incidente);
    setModalVisible(true);
  };

  const handleBackToList = () => {
    setSelectedIncidente(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleViewDetails(item)}>
      <Text style={styles.itemText}>Fecha: {formatDate(item.fecha)}</Text>
      <Text style={styles.itemText}>Hora: {item.hora}</Text>
      <Text style={styles.itemText}>Lugar: {item.lugar}</Text>
      <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={fetchIncidentes}>
        <Text style={styles.buttonText}>Buscar Incidentes</Text>
      </TouchableOpacity>

      {loading && <Text>Cargando incidentes...</Text>}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && incidentes.length > 0 && (
        <FlatList
          data={incidentes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleBackToList}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Incidente</Text>
            {selectedIncidente && (
              <>
                <Text style={styles.itemText}>Fecha: {formatDate(selectedIncidente.fecha)}</Text>
                <Text style={styles.itemText}>Hora: {selectedIncidente.hora}</Text>
                <Text style={styles.itemText}>Lugar: {selectedIncidente.lugar}</Text>
                <Text style={styles.itemText}>Tipo: {selectedIncidente.tipo}</Text>
                <Text style={styles.itemText}>Descripción: {selectedIncidente.descripcion}</Text>
              </>
            )}
            <TouchableOpacity style={styles.modalButton} onPress={handleBackToList}>
              <Text style={styles.modalButtonText}>Volver al Listado</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.bo} onPress={() => navigateTo('IncidentesMenu')}>
        <Text style={styles.buttonText}>Volver al menú de Incidentes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EDF2F4',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#13293D',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#2A628F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
  },
  itemText: {
    fontSize: 18,
    color: '#16324F',
  },
  listContent: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#EDF2F4',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#13293D',
  },
  modalButton: {
    backgroundColor: '#2A628F',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
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

export default IncidentesDia;
