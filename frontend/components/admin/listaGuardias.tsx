import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { getGuardias, deleteGuardia ,getGuardiaById, updateGuardia} from '@/services/gestion.service';
import { useFocusEffect } from '@react-navigation/native';


interface Guardia {
    _id: string;
    nombre: string;
    apellido: string;
    fono: string;
    rut: string;
    correo: string;
    password: string;
    situacion_laboral: string;
}

const ListaGuardias: React.FC = () => {
    const [guardias, setGuardias] = useState<Guardia[]>([]);
    const [selectedGuardia, setSelectedGuardia] = useState<Guardia | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            fetchGuardias();
        }, [])
    );

    const fetchGuardias = useCallback(async () => {
        try {
            const response = await getGuardias();
            if (Array.isArray(response)) {
                setGuardias(response); 
            } else {
                console.error('Unexpected response format:', response);
                Alert.alert('Error', 'Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching guardias:', error);
            Alert.alert('Error', 'No se pudo cargar la lista de guardias');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteGuardia(id);
            if (response.message === 'Guardia eliminado') {
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
            setLoading(true);
            const response = await getGuardiaById(id);
            setSelectedGuardia(response);
        } catch (error) {
            console.error('Error fetching guardia details:', error);
            Alert.alert('Error', 'No se pudo cargar los detalles del guardia');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (selectedGuardia) {
            const updatedGuardia = {
                rut: selectedGuardia.rut,
                nombre: selectedGuardia.nombre,
                apellido: selectedGuardia.apellido,
                fono: selectedGuardia.fono,
                correo: selectedGuardia.correo,
                password: selectedGuardia.password,
                rol: 'Guardia',
                cargo: 'Guardia',
                situacion_laboral: selectedGuardia.situacion_laboral
            };
            try {
                const response = await updateGuardia(selectedGuardia._id, updatedGuardia);
                if (response.state === "Success") {
                    Alert.alert('Éxito', 'Guardia actualizado correctamente');
                    setIsEditing(false);
                    fetchGuardias();
                    handleViewDetails(selectedGuardia._id); // Volver a la vista de detalles después de actualizar
                } else {
                    Alert.alert('Error', 'No se pudo actualizar el guardia');
                }
            } catch (error) {
                console.error('Error updating guardia:', error);
                Alert.alert('Error', 'No se pudo actualizar el guardia');
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleBackToList = () => {
        setSelectedGuardia(null);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (selectedGuardia) {
        if (isEditing) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Modificar Guardia</Text>
                    <View style={styles.itemContainer}>
                        <TextInput
                            style={styles.input}
                            value={selectedGuardia.rut}
                            onChangeText={rut => setSelectedGuardia({ ...selectedGuardia, rut })}
                            placeholder="RUT"
                            editable={false} // No permitir editar el RUT
                        />
                        <TextInput
                            style={styles.input}
                            value={selectedGuardia.nombre}
                            onChangeText={nombre => setSelectedGuardia({ ...selectedGuardia, nombre })}
                            placeholder="Nombre"
                        />
                        <TextInput
                            style={styles.input}
                            value={selectedGuardia.apellido}
                            onChangeText={apellido => setSelectedGuardia({ ...selectedGuardia, apellido })}
                            placeholder="Apellido"
                        />
                        <TextInput
                            style={styles.input}
                            value={selectedGuardia.fono}
                            onChangeText={fono => setSelectedGuardia({ ...selectedGuardia, fono })}
                            placeholder="Fono"
                        />
                        <TextInput
                            style={styles.input}
                            value={selectedGuardia.situacion_laboral}
                            onChangeText={situacion_laboral => setSelectedGuardia({ ...selectedGuardia, situacion_laboral })}
                            placeholder="Situación Laboral"
                        />
                        <Button title="Guardar Cambios" onPress={handleUpdate} />
                        <Button title="Cancelar" onPress={handleCancelEdit} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Detalles del Guardia</Text>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>RUT: {selectedGuardia.rut}</Text>
                        <Text style={styles.itemText}>Nombre: {selectedGuardia.nombre}</Text>
                        <Text style={styles.itemText}>Apellido: {selectedGuardia.apellido}</Text>
                        <Text style={styles.itemText}>Fono: {selectedGuardia.fono}</Text>
                        <Text style={styles.itemText}>Correo: {selectedGuardia.correo}</Text>
                        <Text style={styles.itemText}>Situación Laboral: {selectedGuardia.situacion_laboral}</Text>
                        <Button title="Modificar" onPress={handleEdit} />
                        <Button title="Volver al Listado" onPress={handleBackToList} />
                    </View>
                </View>
            );
        }
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
});

export default ListaGuardias;