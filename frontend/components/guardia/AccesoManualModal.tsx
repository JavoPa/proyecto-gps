import React from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import CustomButton from '../customButton';

interface AccesoModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleFieldChangeIngreso: (field: string, value: string) => void;
  handleActualizar: () => void;
  fieldsIngreso: {
    nombre: string;
    apellido: string;
    rut: string;
    fono: string;
    correo: string;
  };
}

const AccesoManualModal: React.FC<AccesoModalProps> = ({ modalVisible, setModalVisible, handleFieldChangeIngreso, fieldsIngreso, handleActualizar }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.titleContainer}>Ingreso Manual</Text>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Nombre: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleFieldChangeIngreso('nombre', value)}
              value={fieldsIngreso.nombre}
              maxLength={20}
              placeholder="Ej: Juan"
              placeholderTextColor='gray'
              textAlign="left"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Apellido: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleFieldChangeIngreso('apellido', value)}
              value={fieldsIngreso.apellido}
              maxLength={20}
              placeholder="Ej: Ramírez"
              placeholderTextColor='gray'
              textAlign="left"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Rut: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleFieldChangeIngreso('rut', value)}
              value={fieldsIngreso.rut}
              maxLength={10}
              placeholder="Ej: 20123456-0"
              placeholderTextColor='gray'
              textAlign="left"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Correo: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleFieldChangeIngreso('correo', value)}
              value={fieldsIngreso.correo}
              maxLength={40}
              placeholder="Ej: juan@gmail.com"
              placeholderTextColor='gray'
              textAlign="left"
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Fono: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleFieldChangeIngreso('fono', value)}
              value={fieldsIngreso.fono}
              maxLength={11}
              placeholder="Ej: 56912345678"
              placeholderTextColor='gray'
              textAlign="left"
            />
          </View>
          <View style={styles.buttonContainer}>
            <View>
              <CustomButton
                title="Ingresar"
                onPress={handleActualizar}
                style={styles.button}
              />
            </View>
            <View>
              <CustomButton
                title="Cancelar"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccesoManualModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  titleContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#13293D',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 100,
    color: '#13293D',
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    color: 'black',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 10,
  },
});