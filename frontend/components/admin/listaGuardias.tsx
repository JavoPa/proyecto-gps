import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TextInput, Modal, TouchableOpacity } from 'react-native';
import { getGuardias, deleteGuardia, getGuardiaById, updateGuardia } from '@/services/gestion.service';
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
    const [filteredGuardias, setFilteredGuardias] = useState<Guardia[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGuardia, setSelectedGuardia] = useState<Guardia | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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
                setFilteredGuardias(response);
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

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredGuardias(guardias);
        } else {
            const filtered = guardias.filter(guardia =>
                guardia.rut.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredGuardias(filtered);
        }
    };

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
            setModalVisible(true);
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
        setModalVisible(false);
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Guardias</Text>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
                placeholder="Buscar por RUT"
            />
            <FlatList
                data={filteredGuardias}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Rut: {item.rut}</Text>
                        <Text style={styles.itemText}>Nombre: {item.nombre + " "+ item.apellido}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item._id)}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleViewDetails(item._id)}>
                                <Text style={styles.buttonText}>Ver</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={handleBackToList}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {isEditing ? (
                            <>
                                <Text style={styles.modalTitle}>Modificar Guardia</Text>
                                <TextInput
                                    style={styles.input}
                                    value={selectedGuardia?.rut}
                                    onChangeText={rut => setSelectedGuardia(prev => prev ? { ...prev, rut } : null)}
                                    placeholder="RUT"
                                    editable={false} 
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedGuardia?.nombre}
                                    onChangeText={nombre => setSelectedGuardia(prev => prev ? { ...prev, nombre } : null)}
                                    placeholder="Nombre"
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedGuardia?.apellido}
                                    onChangeText={apellido => setSelectedGuardia(prev => prev ? { ...prev, apellido } : null)}
                                    placeholder="Apellido"
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedGuardia?.fono}
                                    onChangeText={fono => setSelectedGuardia(prev => prev ? { ...prev, fono } : null)}
                                    placeholder="Fono"
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedGuardia?.situacion_laboral}
                                    onChangeText={situacion_laboral => setSelectedGuardia(prev => prev ? { ...prev, situacion_laboral } : null)}
                                    placeholder="Situación Laboral"
                                />
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
                                        <Text style={styles.modalButtonText}>Guardar Cambios</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleCancelEdit}>
                                        <Text style={styles.modalButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Detalles del Guardia</Text>
                                <Text style={styles.itemText}>RUT: {selectedGuardia?.rut}</Text>
                                <Text style={styles.itemText}>Nombre: {selectedGuardia?.nombre}</Text>
                                <Text style={styles.itemText}>Apellido: {selectedGuardia?.apellido}</Text>
                                <Text style={styles.itemText}>Fono: {selectedGuardia?.fono}</Text>
                                <Text style={styles.itemText}>Correo: {selectedGuardia?.correo}</Text>
                                <Text style={styles.itemText}>Situación Laboral: {selectedGuardia?.situacion_laboral}</Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                                        <Text style={styles.modalButtonText}>Modificar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleBackToList}>
                                        <Text style={styles.modalButtonText}>Volver al Listado</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
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
    buttonContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
        backgroundColor: '#FF0000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
    },
    modalContent: {
        width: '90%',
        maxWidth: 600,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalButtonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ListaGuardias;