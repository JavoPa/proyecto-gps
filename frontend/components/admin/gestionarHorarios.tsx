import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getHorarios, putHorarios } from '@/services/horario.service';
import Card from '@/components/Card';
import { useColorScheme } from 'react-native';

interface Horas {
    _id: string;
    limiteEntrada: string;
    limiteSalida: string;
}

const GestionarHorarios: React.FC = () => {
    const [horarios, setHorarios] = useState<Horas[]>([]);
    const [selectedHorario, setSelectedHorario] = useState<Horas | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newLimiteEntrada, setNewLimiteEntrada] = useState<string>('');
    const [newLimiteSalida, setNewLimiteSalida] = useState<string>('');

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
    };

    const validateTime = (time: string) => {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timePattern.test(time);
    };

    const handleSubmit = async () => {
        if (!validateTime(newLimiteEntrada) || !validateTime(newLimiteSalida)) {
            Alert.alert('Error', 'Por favor, ingresa una hora válida en el formato HH:mm.');
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
                fetchHorarios(); // Refresh the list
                Alert.alert('Success', 'Horario actualizado correctamente');
            } catch (error) {
                console.error('Error updating horario:', error);
                Alert.alert('Error', 'No se pudo actualizar el horario');
            }
        }
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Editar Horario</Text>
                    <View style={styles.line}>
                        <Text style={styles.txtInput}>Hora de Apertura:</Text>
                        <TextInput
                        style={styles.input}
                        placeholder="8:00"
                        value={newLimiteEntrada}
                        onChangeText={setNewLimiteEntrada}
                        />
                    </View>
                    <View style={styles.line}>
                    <Text style={styles.txtInput}>Hora de Cierre:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="20:00"
                            value={newLimiteSalida}
                            onChangeText={setNewLimiteSalida}
                        />
                    </View>
                    <Button title="Guardar" onPress={handleSubmit} />
                    <Button title="Cancelar" onPress={() => setIsEditing(false)} color="red" />
                </View>
            ) : (
                <FlatList
                    data={horarios}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.cardsContainer}>
                                <Card title="Hora Apertura" body={item.limiteEntrada + " hrs"} />
                                <Card title="Hora Cierre" body={item.limiteSalida + " hrs"} />
                            </View>
                            <Button title="Cambiar horarios" onPress={() => handleEdit(item)}/>
                        </View>
                    )}
                />
            )}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        marginBottom: 20,
        width: '100%',
    },
    cardsContainer: {
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    formContainer: {
        height: '90%',
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '50%',
        color: 'gray',
    },
    txtInput: {
        fontSize: 16,
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
