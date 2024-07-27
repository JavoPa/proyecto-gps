import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface BicicletaModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    bicicletaNotExists: boolean;
    handleFieldChange: (field: string, value: string) => void;
    handleActualizar: () => void;
    fields: {
      marca: string;
      color: string;
    };
  }

const BicicletaModal: React.FC<BicicletaModalProps> = ({ modalVisible, setModalVisible, bicicletaNotExists, handleFieldChange, fields, handleActualizar }) => {
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
            <Text style={styles.titleContainer}>{!bicicletaNotExists ? 'Actualizar datos' : 'Registrar datos'}</Text>

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

export default BicicletaModal;

const styles = StyleSheet.create({
    //
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: This adds a semi-transparent background
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
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color: '#13293D',
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
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    button: {
      margin: 10, // Agrega un margen a los botones
    },
  });
  