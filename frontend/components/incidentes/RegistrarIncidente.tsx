import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import DateTimePickerWrapper from './DateTimePickerWrapper'; // Adjust the path accordingly
import { createIncidente } from '@/services/incidentes.service';
import { formatDate, formatDateDMY } from '../../Utils';

// Listo

interface RegistrarIncidenteProps {
  navigateTo: (component: string) => void;
}

const RegistrarIncidente: React.FC<RegistrarIncidenteProps> = ({ navigateTo }) => {
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [hora, setHora] = useState<Date | null>(new Date());
  const [lugar, setLugar] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [showHoraPicker, setShowHoraPicker] = useState(false);

  const handleSubmit = async () => {
    if (!fecha || !hora || !descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (lugar === '') {
      Alert.alert('Error', 'Escoja un lugar');
      return;
    }

    if (tipo === '') {
      Alert.alert('Error', 'Escoja un tipo');
      return;
    }

    try {
      const formattedFecha = formatDate(fecha);
      const formattedHora = hora.toTimeString().split(' ')[0]; // Format the time to HH:MM:SS
      
      const response = await createIncidente(formattedFecha, formattedHora, lugar, tipo, descripcion);
      if (response.status === 201) {
        Alert.alert('Éxito', 'Incidente creado correctamente');
        // Reset the form fields
        setFecha(new Date());
        setHora(new Date());
        setLugar('');
        setTipo('');
        setDescripcion('');
      } else {
        Alert.alert('Error', response.message || 'No se pudo crear el incidente');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar crear el incidente');
    }
  };

  const showDatePicker = () => {
    setShowFechaPicker(true);
  };

  const showTimePicker = () => {
    setShowHoraPicker(true);
  };

  const onFechaChange = (event: any, selectedDate: Date | undefined) => {
    setShowFechaPicker(false);
    if (selectedDate) {
      const today = new Date();
      // Check if the selected date is in the future
      if (selectedDate > today) {
        alert('No se pueden registrar incidentes en el futuro, seleccione otra fecha');
        return;
      } else {
        setFecha(selectedDate);
      }
    }
  };

  const onHoraChange = (event: any, selectedTime: Date | undefined) => {
    setShowHoraPicker(false);
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView>
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.input}
            value={fecha ? formatDateDMY(fecha) : ''}
            editable={false}
            placeholder="Seleccione la fecha"
          />
        </TouchableOpacity>
        {showFechaPicker && (
          <DateTimePickerWrapper
            value={fecha || new Date()}
            mode="date"
            onChange={onFechaChange}
          />
        )}

        <Text style={styles.label}>Hora</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <TextInput
            style={styles.input}
            value={hora ? hora.toTimeString().split(' ')[0].substring(0, 5) : ''}
            editable={false}
            placeholder="Seleccione la hora"
          />
        </TouchableOpacity>
        {showHoraPicker && (
          <DateTimePickerWrapper
            value={hora || new Date()}
            mode="time"
            onChange={onHoraChange}
          />
        )}

        <Text style={styles.label}>Lugar</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={lugar}
            onValueChange={(itemValue) => setLugar(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un lugar" value="" />
            <Picker.Item label="Entrada" value="Entrada" />
            <Picker.Item label="Gantes" value="Gantes" />
            <Picker.Item label="Edificio AC" value="Edificio AC" />
            <Picker.Item label="Edificio AB" value="edificio AB" />
            <Picker.Item label="Salas AA" value="Salas AA" />
            <Picker.Item label="FACE" value="FACE" />
            <Picker.Item label="exIM" value="exIM" />
            <Picker.Item label="Otro" value="Otro" />
            {/* Add more options as needed */}
          </Picker>
        </View>

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un tipo" value="" />
            <Picker.Item label="Robo" value="Robo" />
            <Picker.Item label="Desaparición" value="Desaparición" />
            <Picker.Item label="Otro" value="Otro" />
            {/* Add more options as needed */}
          </Picker>
        </View>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.textArea}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción del incidente"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Crear Incidente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bo} onPress={() => navigateTo('IncidentesMenu')}>
          <Text style={styles.buttonText}>Volver al menú de incidentes</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
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

export default RegistrarIncidente;
