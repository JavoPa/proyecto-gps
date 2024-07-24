import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { getJaulas, getJaulaById } from '@/services/jaula.service';
import { useFocusEffect } from '@react-navigation/native';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedJaula, setSelectedJaula] = useState<Jaula | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            fetchJaulas();
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

    const handleBackToList = () => {
        setSelectedJaula(null);
        setModalVisible(false);
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
                        <Text style={styles.itemText}>Ubicación: {item.ubicacion}</Text>
                        <Text style={styles.itemText}>Capacidad: {item.capacidad}</Text>
                        <Text style={styles.itemText}>Situación Actual: {item.situacion_actual}</Text>
                        <Text style={styles.itemText}>Guardia Asignado: {item.guardiaAsignado ? `${item.guardiaAsignado.nombre} ${item.guardiaAsignado.apellido}` : 'No asignado'}</Text>
                        <View style={styles.buttonContainer}>
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
                        <Text style={styles.modalTitle}>Detalles de la Jaula</Text>
                        <Text style={styles.itemText}>Ubicación: {selectedJaula?.ubicacion}</Text>
                        <Text style={styles.itemText}>Capacidad: {selectedJaula?.capacidad}</Text>
                        <Text style={styles.itemText}>Identificador: {selectedJaula?.identificador}</Text>
                        <Text style={styles.itemText}>Situación Actual: {selectedJaula?.situacion_actual}</Text>
                        <Text style={styles.itemText}>Guardia Asignado: {selectedJaula?.guardiaAsignado ? `${selectedJaula.guardiaAsignado.nombre} ${selectedJaula.guardiaAsignado.apellido}` : 'No asignado'}</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleBackToList}>
                                <Text style={styles.modalButtonText}>Volver al Listado</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: '#EDF2F4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#13293D',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
    },
    itemText: {
        fontSize: 18,
        color: '#16324F',
    },
    buttonContainer: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#2A628F',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
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
        backgroundColor: '#EDF2F4',
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
});

export default ListaJaulas;