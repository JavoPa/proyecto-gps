import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Button, Alert, TextInput, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getHorarios, putHorarios } from '@/services/horario.service';
import Card from '@/components/Card';
import CustomButton from '../customButton';

interface Horas {
    _id: string;
    limiteEntrada: string;
    limiteSalida: string;
}

const GestionarHorarios: React.FC = () => {
    const { width } = Dimensions.get('window');
    const [horarios, setHorarios] = useState<Horas[]>([]);
    const [selectedHorario, setSelectedHorario] = useState<Horas | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newLimiteEntrada, setNewLimiteEntrada] = useState<string>('');
    const [newLimiteSalida, setNewLimiteSalida] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchHorarios();
    }, []);

    const fetchHorarios = async () => {
        try {
            const response = await getHorarios();
            if (response.data && Array.isArray(response.data)) {
                const validHorarios = response.data.map((item: any) => ({
                    _id: item._id,
                    limiteEntrada: item.limiteEntrada,
                    limiteSalida: item.limiteSalida
                }));
                setHorarios(validHorarios);
            } else {
                console.error('Unexpected response format:', response);
                Alert.alert('Error', 'Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching horarios:', error);
            Alert.alert('Error', 'No se pudo cargar la lista de horarios');
        }
    };

    const handleEdit = (item: Horas) => {
        setSelectedHorario(item);
        setNewLimiteEntrada(item.limiteEntrada);
        setNewLimiteSalida(item.limiteSalida);
        setIsEditing(true);
        setModalVisible(true);
    };

    const validateTime = (time: string) => {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timePattern.test(time);
    };

    const handleSubmit = async () => {
        if (!validateTime(newLimiteEntrada) || !validateTime(newLimiteSalida)) {
            Alert.alert('Error', 'Por favor, ingresa una hora válida en el formato HH:mm');
            return;
        }

        if (selectedHorario) {
            const updatedHorario = {
                ...selectedHorario,
                limiteEntrada: newLimiteEntrada,
                limiteSalida: newLimiteSalida,
            };
            try {
                await putHorarios(updatedHorario);
                setIsEditing(false);
                setModalVisible(false);
                fetchHorarios(); // Refresh the list
                Alert.alert('Guardado', 'Horario actualizado correctamente');
            } catch (error) {
                console.error('Error updating horario:', error);
                Alert.alert('Error', 'No se pudo actualizar el horario');
            }
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setModalVisible(false);
    };

    return (
        <View style={[styles.container]}>
            <FlatList
                data={horarios}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer]}>
                        <View style={styles.cardsContainer}>
                            <Card title="Hora Apertura" body={item.limiteEntrada + " hrs"} />
                            <Card title="Hora Cierre" body={item.limiteSalida + " hrs"} />
                        </View>
                        <CustomButton title="Cambiar horarios" onPress={() => handleEdit(item)} />
                    </View>
                )}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={handleCancelEdit}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent]}>
                        {isEditing ? (
                            <>
                                <Text style={[styles.modalTitle]}>Modificar Horario</Text>
                                <View style={styles.line}>
                                    <Text style={[styles.txtInput]}>Hora de Apertura:</Text>
                                    <TextInput
                                        style={[styles.input]}
                                        placeholder="08:00"
                                        value={newLimiteEntrada}
                                        onChangeText={setNewLimiteEntrada}
                                    />
                                </View>
                                <View style={styles.line}>
                                    <Text style={[styles.txtInput]}>Hora de Cierre:</Text>
                                    <TextInput
                                        style={[styles.input]}
                                        placeholder="20:00"
                                        value={newLimiteSalida}
                                        onChangeText={setNewLimiteSalida}
                                    />
                                </View>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                                        <Text style={styles.modalButtonText}>Guardar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleCancelEdit}>
                                        <Text style={styles.modalButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : null}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        padding: width < 600 ? 10 : 20,
        marginBottom: 20,
        width: '100%',
    },
    cardsContainer: {
        justifyContent: 'space-between',
        width: width < 600 ? '100%' : '100%',
    },
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
        width: width < 600 ? '90%' : '70%',
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
    txtInput: {
        fontSize: width < 600 ? 16 : 25,
        fontWeight: 'bold',
        marginTop: 5,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default GestionarHorarios;