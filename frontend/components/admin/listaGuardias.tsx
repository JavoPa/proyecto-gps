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
    const [selectedGuardia, setSelectedGuardia] = useState<Guardia | null>(null); // Estado para guardar el guardia seleccionado

    useEffect(() => {
        fetchGuardias();
    }, []);

    const fetchGuardias = async () => {
        const response = await getGuardias();
        const validGuardias = response.filter((guardia: Guardia) => guardia._id !== undefined);
        setGuardias(validGuardias);
    };

    const handleDelete = async (id: string) => {
        const response = await deleteGuardia(id);
        if (response && response.success) {
            fetchGuardias(); // Actualiza la lista de guardias después de eliminar uno
            Alert.alert('Éxito', 'Guardia eliminado correctamente');
        } else {
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
        setSelectedGuardia(null); // Vuelve a la lista, resetea el guardia seleccionado
    };

    if (selectedGuardia) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Detalles del Guardia</Text>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>Nombre: {selectedGuardia.nombre}</Text>
                    <Text style={styles.itemText}>Apellido: {selectedGuardia.apellido}</Text>
                    <Text style={styles.itemText}>Fono: {selectedGuardia.fono}</Text>
                    <Text style={styles.itemText}>Rut: {selectedGuardia.rut}</Text>
                    <Text style={styles.itemText}>Correo: {selectedGuardia.correo}</Text>
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