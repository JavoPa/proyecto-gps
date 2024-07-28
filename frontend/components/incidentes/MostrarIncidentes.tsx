import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllIncidentes } from '@/services/incidentes.service';
import { formatDate, formatDateDMY } from '../../Utils';

interface Incidente {
    _id: string;
    fecha: Date;
    hora: string;
    lugar: string;
    tipo: string;
    descripcion: string;
}

interface MostrarIncidentesProps {
    navigateTo: (component: string) => void;
}

const MostrarIncidentes: React.FC<MostrarIncidentesProps> = ({ navigateTo }) => {
    const [incidentes, setIncidentes] = useState<Incidente[]>([]);
    const [filteredIncidentes, setFilteredIncidentes] = useState<Incidente[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedIncidente, setSelectedIncidente] = useState<Incidente | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            fetchIncidentes();
        }, [])
    );

    const fetchIncidentes = useCallback(async () => {
        try {
            const response = await getAllIncidentes();
            if (response.status === 200) {
                const incidentesData = response.data.data.map((incidente: any) => ({
                    ...incidente,
                    fecha: new Date(incidente.fecha),
                }));
                /*
                response.data.data.forEach((element: any) => {
                    console.log(element._id);
                });
                */
                setIncidentes(incidentesData);
                setFilteredIncidentes(incidentesData);
            } else {
                console.error('Unexpected response format:', response);
                alert('Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching incidentes:', error);
            alert('No se pudo cargar la lista de incidentes');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredIncidentes(incidentes);
        } else {
            const filtered = incidentes.filter(incidente =>
                incidente.tipo.toLowerCase().includes(term.toLowerCase()) || 
                incidente.lugar.toLowerCase().includes(term.toLowerCase()) || 
                formatDate(incidente.fecha).toLowerCase().includes(term.toLowerCase())
            );
            setFilteredIncidentes(filtered);
        }
    };

    const handleViewDetails = async (id: string) => {
        const incidente = incidentes.find(inc => inc._id === id);
        setSelectedIncidente(incidente || null);
        setModalVisible(true);
    };

    const handleBackToList = () => {
        setSelectedIncidente(null);
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
            <Text style={styles.title}>Listado de Incidentes</Text>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
                placeholder="Buscar por Tipo, Lugar o Fecha"
            />
            <FlatList
                data={filteredIncidentes}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Fecha: {formatDateDMY(item.fecha)}</Text>
                        <Text style={styles.itemText}>Hora: {item.hora}</Text>
                        <Text style={styles.itemText}>Lugar: {item.lugar}</Text>
                        <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
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
                        <Text style={styles.modalTitle}>Detalles del Incidente</Text>
                        <Text style={styles.itemText}>Fecha: {selectedIncidente?.fecha && formatDateDMY(selectedIncidente.fecha)}</Text>
                        <Text style={styles.itemText}>Hora: {selectedIncidente?.hora}</Text>
                        <Text style={styles.itemText}>Lugar: {selectedIncidente?.lugar}</Text>
                        <Text style={styles.itemText}>Tipo: {selectedIncidente?.tipo}</Text>
                        <Text style={styles.itemText}>Descripción: {selectedIncidente?.descripcion}</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleBackToList}>
                                <Text style={styles.modalButtonText}>Volver al Listado</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.bo} onPress={() => navigateTo('IncidentesMenu')}>
                <Text style={styles.buttonText}>Volver al menú de incidentes</Text>
            </TouchableOpacity>
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
    bo: {
        backgroundColor: '#2A628F',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
});

export default MostrarIncidentes;
