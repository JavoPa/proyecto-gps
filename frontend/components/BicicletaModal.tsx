import React from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CustomButton from './customButton';

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
    const { width } = Dimensions.get('window');

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{!bicicletaNotExists ? 'Actualizar datos' : 'Registrar datos'}</Text>

                    <View style={styles.line}>
                        <Text style={styles.txtInput}>Marca: </Text>
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
                    <View style={styles.line}>
                        <Text style={styles.txtInput}>Modelo: </Text>
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
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleActualizar}>
                            <Text style={styles.modalButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#EDF2F4',
        padding: 16,
        borderRadius: 12,
        width: width < 600 ? '90%' : '40%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: width < 600 ? 24 : 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#13293D',
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    txtInput: {
        fontSize: width < 600 ? 16 : 25,
        fontWeight: 'bold',
        marginTop: 5,
    },
    input: {
        height: width < 600 ? 40 : 60,
        width: width < 600 ? '50%' : '50%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    modalButtonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#2A628F',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default BicicletaModal;