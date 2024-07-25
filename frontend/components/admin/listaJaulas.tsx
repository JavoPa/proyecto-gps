import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Modal, TouchableOpacity, Linking } from 'react-native';
import { getJaulas, deleteJaula, getJaulaById, updateJaula } from '@/services/jaula.service';
import { getGuardias } from '@/services/gestion.service'; // Importa el servicio de guardias
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Importa el Picker

interface Guardia {
    _id: string;
    nombre: string;
    apellido: string;
}

interface Jaula {
    _id: string;
    ubicacion: string;
    capacidad: number;
    situacion_actual: number;
    identificador: string;
    guardiaAsignado: { _id: string, nombre: string, apellido: string } | null;
}

const ListaJaulas: React.FC = () => {
    const [jaulas, setJaulas] = useState<Jaula[]>([]);
    const [filteredJaulas, setFilteredJaulas] = useState<Jaula[]>([]);
    const [guardias, setGuardias] = useState<Guardia[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedJaula, setSelectedJaula] = useState<Jaula | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            fetchJaulas();
            fetchGuardias(); // Obtén la lista de guardias cuando el componente tenga foco
        }, [])
    );

    const fetchJaulas = useCallback(async () => {
        try {
            const response = await getJaulas();
            if (Array.isArray(response)) {
                setJaulas(response);
                setFilteredJaulas(response);
            } else {
                console.error('Unexpected response format:', response);
                alert('Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching jaulas:', error);
            alert('No se pudo cargar la lista de jaulas');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchGuardias = useCallback(async () => {
        try {
            const response = await getGuardias();
            if (Array.isArray(response)) {
                setGuardias(response);
            } else {
                console.error('Unexpected response format:', response);
                alert('Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching guardias:', error);
            alert('No se pudo cargar la lista de guardias');
        }
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredJaulas(jaulas);
        } else {
            const filtered = jaulas.filter(jaula =>
                jaula.identificador.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredJaulas(filtered);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteJaula(id);
            if (response.message === 'Jaula eliminada con éxito') {
                fetchJaulas();
                alert('Jaula eliminada correctamente');
            } else {
                alert('No se pudo eliminar la jaula');
            }
        } catch (error) {
            console.error('Error deleting jaula:', error);
            alert('No se pudo eliminar la jaula');
        }
    };

    const handleViewDetails = async (id: string) => {
        try {
            setLoading(true);
            const response = await getJaulaById(id);
            setSelectedJaula(response);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching jaula details:', error);
            alert('No se pudo cargar los detalles de la jaula');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenMaps = () => {
        try {
            if (selectedJaula?.ubicacion) {
                // Validar la URL de Google Maps en el frontend
                const googleMapsUrlPattern = /^https:\/\/(www\.)?google\.com\/maps\/.+/;
                if (!googleMapsUrlPattern.test(selectedJaula.ubicacion)) {
                    alert('La URL de Google Maps no es válida');
                    return;
                }

                Linking.openURL(selectedJaula.ubicacion);
            }
        } catch (error) {
            alert('La URL de Google Maps no es válida o no se puede abrir.');
        }
    };

    const handleUpdate = async () => {
        if (selectedJaula) {
            const updatedJaula = {
                ubicacion: selectedJaula.ubicacion,
                capacidad: selectedJaula.capacidad,
                identificador: selectedJaula.identificador,
                guardiaAsignado: selectedJaula.guardiaAsignado?._id || null // Enviar solo el ID del guardia asignado
            };
            try {
                const response = await updateJaula(selectedJaula._id, updatedJaula);
                if (response.state === "Success") {
                    alert('Jaula actualizada correctamente');
                    setIsEditing(false);
                    setModalVisible(false);  // Cerrar el modal
                    fetchJaulas();  // Actualizar la lista de jaulas
                } else {
                    alert('No se pudo actualizar la jaula');
                }
            } catch (error) {
                console.error('Error updating jaula:', error);
                alert('No se pudo actualizar la jaula');
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleBackToList = () => {
        setSelectedJaula(null);
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
            <Text style={styles.title}>Listado de Jaulas</Text>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
                placeholder="Buscar por Identificador"
            />
            <FlatList
                data={filteredJaulas}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Identificador: {item.identificador}</Text>
                        <Text style={styles.itemText}>Capacidad: {item.capacidad}</Text>
                        <Text style={styles.itemText}>Guardia Asignado: {item.guardiaAsignado ? `${item.guardiaAsignado.nombre} ${item.guardiaAsignado.apellido}` : 'No asignado'}</Text>
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
                                <Text style={styles.modalTitle}>Modificar Jaula</Text>
                                <TextInput
                                    style={styles.input}
                                    value={selectedJaula?.ubicacion}
                                    onChangeText={ubicacion => setSelectedJaula(prev => prev ? { ...prev, ubicacion } : null)}
                                    placeholder="Ubicación"
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedJaula?.capacidad.toString()}
                                    onChangeText={capacidad => setSelectedJaula(prev => prev ? { ...prev, capacidad: parseInt(capacidad, 10) } : null)}
                                    placeholder="Capacidad"
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.input}
                                    value={selectedJaula?.identificador}
                                    onChangeText={identificador => setSelectedJaula(prev => prev ? { ...prev, identificador } : null)}
                                    placeholder="Identificador"
                                />
                                <Picker
                                    selectedValue={selectedJaula?.guardiaAsignado?._id || null}
                                    onValueChange={(itemValue) => setSelectedJaula(prev => prev ? { ...prev, guardiaAsignado: guardias.find(guardia => guardia._id === itemValue) || null } : null)}
                                >
                                    <Picker.Item label="Ninguno" value={null} />
                                    {guardias.map(guardia => (
                                        <Picker.Item key={guardia._id} label={`${guardia.nombre} ${guardia.apellido}`} value={guardia._id} />
                                    ))}
                                </Picker>
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
                                <Text style={styles.modalTitle}>Detalles de la Jaula</Text>
                                <Text style={styles.itemText}>Capacidad: {selectedJaula?.capacidad}</Text>
                                <Text style={styles.itemText}>Identificador: {selectedJaula?.identificador}</Text>
                                <Text style={styles.itemText}>Espacios disponibles: {selectedJaula?.situacion_actual}</Text>
                                <Text style={styles.itemText}>Guardia Asignado: {selectedJaula?.guardiaAsignado ? `${selectedJaula.guardiaAsignado.nombre} ${selectedJaula.guardiaAsignado.apellido}` : 'No asignado'}</Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                                        <Text style={styles.modalButtonText}>Modificar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={handleOpenMaps}>
                                        <Text style={styles.modalButtonText}>Ver en Google Maps</Text>
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
        backgroundColor: '#EDF2F4', // Fondo de la app
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#13293D', // Color de texto principal
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        backgroundColor: '#FFFFFF', // Fondo del input
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF', // Fondo del item
    },
    itemText: {
        fontSize: 18,
        color: '#16324F', // Color del texto de los items
    },
    buttonContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#2A628F', // Color de los botones
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
        backgroundColor: '#DB2B39', // Color de los botones de eliminar
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Color del texto de los botones
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF', // Fondo del input
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
        backgroundColor: '#EDF2F4', // Fondo del modal
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
        color: '#13293D', // Color del título del modal
    },
    modalButtonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#2A628F', // Color de los botones del modal
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFFFFF', // Color del texto de los botones del modal
        fontSize: 16,
    },
});

export default ListaJaulas;
