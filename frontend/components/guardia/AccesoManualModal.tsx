import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface AccesoModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    handleFieldChange: (field: string, value: string) => void;
    handleActualizar: () => void;
    fields: {
      marca: string;
      color: string;
    };
  }

const AccesoManualModal: React.FC<AccesoModalProps> = ({ modalVisible, setModalVisible, handleFieldChange, fields, handleActualizar }) => {
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
              <Text style={styles.title}>Marca: </Text>
              <TextInput 
                style={styles.input} 
                onChangeText={(value) => handleFieldChange('marca', value)}
                value={fields.marca}
                maxLength={20}
                placeholder="Ej: Oxford"
                placeholderTextColor='gray'
                textAlign="left"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.title}>Modelo: </Text>
              <TextInput
                style={styles.input} 
                onChangeText={(value) => handleFieldChange('color', value)}
                value={fields.color}
                maxLength={20}
                placeholder="Ej: Azul"
                placeholderTextColor='gray'
                textAlign="left"
              />
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="Guardar"
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
  