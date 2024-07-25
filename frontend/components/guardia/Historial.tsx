import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TextInput} from 'react-native';
import { getAllHistorial} from '@/services/historial.service';
import { useFocusEffect } from '@react-navigation/native';

interface HistorialItem {
    _id: string;
    usuario: {
        nombre: string;
        apellido: string;
        rut: string;
    };
    entrada: string | null;
    salida: string | null;
}

const HistorialViewer: React.FC = () => {
    const [historial, setHistorial] = useState<HistorialItem[]>([]);
    const [filteredHistorial, setFilteredHistorial] = useState<HistorialItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            fetchHistorial();
        }, [])
    );

    const fetchHistorial = useCallback(async () => {
        try {
            const data = await getAllHistorial();
            setHistorial(data);
            setFilteredHistorial(data);
        } catch (error) {
            console.error('Error fetching historial:', error);
            Alert.alert('Error', 'No se pudo cargar el historial de accesos');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (term === '') {
            setFilteredHistorial(historial);
        } else {
            const filtered = historial.filter(item =>
                item.usuario.rut.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredHistorial(filtered);
        }
    };

    const renderItem = ({ item }: { item: HistorialItem }) => (
        <View style={styles.item}>
            <Text style={styles.text}>Rut: {item.usuario.rut}</Text>
            <Text style={styles.text}>Nombre: {item.usuario.nombre + " "+item.usuario.apellido}</Text>
            <Text style={styles.text}>Entrada: {item.entrada ? new Date(item.entrada).toLocaleString() : 'No registrada'}</Text>
            <Text style={styles.text}>Salida: {item.salida ? new Date(item.salida).toLocaleString() : 'No registrada'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={handleSearch}
                placeholder="Buscar por RUT"
            />
            {loading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={filteredHistorial}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.list}
                />
            )}
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
        paddingLeft: 8,
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    item: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    text: {
        fontSize: 16,
    },
});

export default HistorialViewer;