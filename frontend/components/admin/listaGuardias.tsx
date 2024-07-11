import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { getGuardias, deleteGuardia ,getGuardiaById} from '@/services/gestion.service';

interface Guardia {
    _id: string;
    nombre: string;
    apellido: string;
    fono:string;
    rut:string;
    correo:string;
}

const ListaGuardias: React.FC = () => {
    const [guardias, setGuardias] = useState<Guardia[]>([]);
    const [selectedGuardia, setSelectedGuardia] = useState<Guardia | null>(null);

    useEffect(() => {
        fetchGuardias();
    }, []);

    const fetchGuardias = async () => {
        try {
            const response = await getGuardias();
            if (Array.isArray(response)) {
                const validGuardias = response.filter((guardia: Guardia) => guardia._id !== undefined);
                setGuardias(validGuardias);
            } else {
                console.error('Unexpected response format:', response);
                Alert.alert('Error', 'Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching guardias:', error);
            Alert.alert('Error', 'No se pudo cargar la lista de guardias');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteGuardia(id);
            if (response && response.success) {
                fetchGuardias();
                Alert.alert('Éxito', 'Guardia eliminado correctamente');
            } else {
                Alert.alert('Error', 'No se pudo eliminar el guardia');
            }
        } catch (error) {
            console.error('Error deleting guardia:', error);
            Alert.alert('Error', 'No se pudo eliminar el guardia');
        }
    };

    const handleViewDetails = async (id: string) => {
        try {
            const response = await getGuardiaById(id);
            setSelectedGuardia(response);
        } catch (error) {
            console.error('Error fetching guardia details:', error);
            Alert.alert('Error', 'No se pudo cargar los detalles del guardia');
        }
    };

    const handleBackToList = () => {
        setSelectedGuardia(null);
    };

    if (selectedGuardia) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Detalles del Guardia</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Nombre: {selectedGuardia.nombre}</Text>
                    <Text style={styles.itemText}>Apellido: {selectedGuardia.apellido}</Text>
                    <Text style={styles.itemText}>Fono: {selectedGuardia.fono}</Text>
                    <Button title="Volver al Listado" onPress={handleBackToList} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Guardias</Text>
            <FlatList
                data={guardias}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Nombre: {item.nombre}</Text>
                        <Text style={styles.itemText}>Apellido: {item.apellido}</Text>
                        <Button title="Eliminar" onPress={() => handleDelete(item._id)} color="red" />
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
    },
});

export default ListaGuardias;
