import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

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
              <Text style={styles.title}>Nombre: </Text>
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
              <Text style={styles.title}>Apellido: </Text>
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
              <Text style={styles.title}>Rut: </Text>
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
              <Text style={styles.title}>Correo: </Text>
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
              <Text style={styles.title}>Fono: </Text>
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
              <View style={styles.button}>
                <Button
                  title="Ingresar"
                  onPress={handleActualizar}
                  color='green'
                />
              </View>
              <View style={styles.button}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                  color='red'
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
    //
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: This adds a semi-transparent background
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#25292e',
      borderRadius: 18,
      padding: 20,
    },
    titleContainer: {
      color: '#fff',
      fontSize: 16,
      marginBottom: 10,
    },
    title: {
      color: '#fff',
      fontSize: 14,
  
    },
    input: {
      height: 40,
      width: 150,
      borderColor: 'gray',
      borderWidth: 1,
      marginLeft: 10,
      padding: 5,
      color: 'white',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: '#25292e',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#25292e',
    },
    button: {
      margin: 10, // Agrega un margen a los botones
    },
  });
  