import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerWrapper from './DateTimePickerWrapper'; // Adjust the path accordingly
import { createIncidente } from '@/services/incidentes.service';
import { jwtDecode } from 'jwt-decode';

const RegistrarIncidente: React.FC = () => {
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [hora, setHora] = useState<Date | null>(new Date());
  const [lugar, setLugar] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [informante, setInformante] = useState('');
  const [showFechaPicker, setShowFechaPicker] = useState(false);
  const [showHoraPicker, setShowHoraPicker] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      // @ts-ignore
      const userId = decodedToken.id;
      setInformante(userId);
    }
  }, []);

  useEffect(() => {
    console.log(typeof(informante));
  }, [informante]);

  const handleSubmit = async () => {
    if (!fecha || !hora || !lugar || !tipo || !descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {

      const formattedFecha = fecha.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
      const formattedHora = hora.toTimeString().split(' ')[0]; // Format the time to HH:MM:SS
      const response = await createIncidente(formattedFecha, formattedHora, lugar, tipo, descripcion, informante);
      if (response.status === 200) {
        Alert.alert('Success', 'Incidente creado correctamente');
        // Reset the form fields
        setFecha(new Date());
        setHora(new Date());
        setLugar('');
        setTipo('');
        setDescripcion('');
        setInformante('');
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
      setFecha(selectedDate);
    }
  };

  const onHoraChange = (event: any, selectedTime: Date | undefined) => {
    setShowHoraPicker(false);
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          value={fecha ? fecha.toISOString().split('T')[0] : ''}
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
      <TextInput
        style={styles.input}
        value={lugar}
        onChangeText={setLugar}
        placeholder="Lugar del incidente"
      />

      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Tipo de incidente"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del incidente"
        multiline
      />

      <Button title="Crear Incidente" onPress={handleSubmit} />
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
});

export default RegistrarIncidente;
