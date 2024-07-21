import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getJaulas, deleteJaula, getJaulaById } from '@/services/jaula.service';

interface Jaula {
    _id: string;
    ubicacion: string;
    identificador: string;
    espaciosDisponibles: number;
}

type RootStackParamList = {
    listaJaulas: undefined;
    crearJaula: undefined;
};

const ListaJaulas: React.FC = () => {
    const [jaulas, setJaulas] = useState<Jaula[]>([]);
    const [selectedJaula, setSelectedJaula] = useState<Jaula | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        fetchJaulas();
    }, []);

    const fetchJaulas = async () => {
        try {
            const response = await getJaulas();
            setJaulas(response);
        } catch (error) {
            console.error('Error fetching jaulas:', error);
            Alert.alert('Error', 'No se pudo cargar la lista de jaulas');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteJaula(id);
            if (response.success) {
                fetchJaulas();
                Alert.alert('Éxito', 'Jaula eliminada correctamente');
            } else {
                Alert.alert('Error', 'No se pudo eliminar la jaula');
            }
        } catch (error) {
            console.error('Error deleting jaula:', error);
            Alert.alert('Error', 'No se pudo eliminar la jaula');
        }
    };

    const handleViewDetails = async (id: string) => {
        try {
            const response = await getJaulaById(id);
            setSelectedJaula(response);
        } catch (error) {
            console.error('Error fetching jaula details:', error);
            Alert.alert('Error', 'No se pudo cargar los detalles de la jaula');
        }
    };

    const handleBackToList = () => {
        setSelectedJaula(null);
    };

    const handleCreateJaula = () => {
        navigation.navigate('crearJaula');
    };

    if (selectedJaula) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Detalles de la Jaula</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Ubicación: {selectedJaula.ubicacion}</Text>
                    <Text style={styles.itemText}>Identificador: {selectedJaula.identificador}</Text>
                    <Text style={styles.itemText}>Espacios Disponibles: {selectedJaula.espaciosDisponibles}</Text>
                    <Button title="Eliminar" onPress={() => handleDelete(selectedJaula._id)} color="red" />
                    <Button title="Volver al Listado" onPress={handleBackToList} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Jaulas</Text>
            <Button title="Agregar Jaula" onPress={handleCreateJaula} />
            <FlatList
                data={jaulas}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer} key={item._id}>
                        <Text style={styles.itemText}>Ubicación: {item.ubicacion}</Text>
                        <Text style={styles.itemText}>Identificador: {item.identificador}</Text>
                        <Text style={styles.itemText}>Espacios Disponibles: {item.espaciosDisponibles}</Text>
                        <Button title="Ver Detalles" onPress={() => handleViewDetails(item._id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default ListaJaulas;
