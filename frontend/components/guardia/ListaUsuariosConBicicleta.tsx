import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { getUsuariosConBicicleta, getUsuarioById } from '@/services/usuario.service';
import { useFocusEffect } from '@react-navigation/native';

interface Bicicleta {
    marca: string;
    modelo: string;
    color: string;
    tipo: string;
    descripcion: string;
    estado: string;
}

interface Usuario {
    _id: string;
    nombre: string;
    apellido: string;
    rut: string;
    fono: string;
    correo: string;
    rol: string;
    bicicleta: Bicicleta | null;
}

const ListaUsuariosConBicicleta: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            fetchUsuarios();
        }, [])
    );

    const fetchUsuarios = useCallback(async () => {
        try {
            const response = await getUsuariosConBicicleta();
            if (Array.isArray(response)) {
                setUsuarios(response);
                setFilteredUsuarios(response);
            } else {
                console.error('Unexpected response format:', response);
                alert('Formato de respuesta inesperado');
            }
        } catch (error) {
            console.error('Error fetching usuarios:', error);
            alert('No se pudo cargar la lista de usuarios');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredUsuarios(usuarios);
        } else {
            const filtered = usuarios.filter(usuario =>
                usuario.rut.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredUsuarios(filtered);
        }
    };

    const handleViewDetails = async (id: string) => {
        try {
            setLoading(true);
            const response = await getUsuarioById(id);
            setSelectedUsuario(response);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching usuario details:', error);
            alert('No se pudo cargar los detalles del usuario');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToList = () => {
        setSelectedUsuario(null);
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
            <Text style={styles.title}>Listado de Usuarios con Bicicleta</Text>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
                placeholder="Buscar por RUT"
            />
            <FlatList
                data={filteredUsuarios}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Nombre: {item.nombre} {item.apellido}</Text>
                        <Text style={styles.itemText}>RUT: {item.rut}</Text>
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
                        <Text style={styles.modalTitle}>Detalles del Usuario</Text>
                        <Text style={styles.itemText}>Nombre: {selectedUsuario?.nombre} {selectedUsuario?.apellido}</Text>
                        <Text style={styles.itemText}>RUT: {selectedUsuario?.rut}</Text>
                        <Text style={styles.itemText}>Fono: {selectedUsuario?.fono}</Text>
                        <Text style={styles.itemText}>Correo: {selectedUsuario?.correo}</Text>
                        <Text style={styles.itemText}>Rol: {selectedUsuario?.rol}</Text>
                        {selectedUsuario?.bicicleta && (
                            <>
                                <Text style={styles.itemText}>Marca: {selectedUsuario.bicicleta.marca}</Text>
                                <Text style={styles.itemText}>Modelo: {selectedUsuario.bicicleta.modelo}</Text>
                                <Text style={styles.itemText}>Color: {selectedUsuario.bicicleta.color}</Text>
                                <Text style={styles.itemText}>Tipo: {selectedUsuario.bicicleta.tipo}</Text>
                                <Text style={styles.itemText}>Descripción: {selectedUsuario.bicicleta.descripcion}</Text>
                                <Text style={styles.itemText}>Estado: {selectedUsuario.bicicleta.estado}</Text>
                            </>
                        )}
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

export default ListaUsuariosConBicicleta;
