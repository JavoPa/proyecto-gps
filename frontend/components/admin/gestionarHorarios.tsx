import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { getHorarios, putHorarios } from '@/services/horario.service';
import Card from '@/components/Card';

interface Horas {
    _id: string;
    limiteEntrada: string;
    limiteSalida: string;
}

const GestionarHorarios: React.FC = () => {
    const [horarios, setHorarios] = useState<Horas[]>([]);
    const [selectedHorario, setSelectedHorario] = useState<Horas | null>(null);

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

    const handlePut = async () => {
        try {
            const response = await putHorarios();
            if (response && response.success) {
                fetchHorarios();
                Alert.alert('Éxito', 'Horario actualizado correctamente');
            } else {
                Alert.alert('Error', 'No se pudo actualizar el horario');
            }
        } catch (error) {
            console.error('Error updating horario:', error);
            Alert.alert('Error', 'No se pudo actualizar el horario');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={horarios}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                    <View style={styles.cardsContainer}>
                        <Card title="Hora Entrada" body={item.limiteEntrada + " hrs"} />
                        <Card title="Hora Salida" body={item.limiteSalida + " hrs"} />
                    </View>
                </View>
                )}
            />
            <Button title="Actualizar horarios" onPress={handlePut} />
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
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    cardsContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
});

export default GestionarHorarios;