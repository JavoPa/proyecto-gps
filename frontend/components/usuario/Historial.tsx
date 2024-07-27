import React, { useState, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { getHistorialUsuario } from '@/services/historial.service'; // Asegúrate de que la ruta sea correcta
import { useFocusEffect } from '@react-navigation/native';
import { Text, View } from '@/components/Themed';

interface HistorialItem {
    _id: string;
    entrada: string | null;
    salida: string | null;
    usuario: {
        nombre: string;
    };
}

const Historial: React.FC = () => {
    const [historial, setHistorial] = useState<HistorialItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHistorial = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getHistorialUsuario();
            setHistorial(data);
        } catch (error) {
            setError('No se pudo cargar el historial');
            Alert.alert('Error', 'No se pudo cargar el historial');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchHistorial();
        }, [fetchHistorial])
    );

    const formatDate = (date: string | null) => {
        return date ? new Date(date).toLocaleString() : 'No registrada';
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={[styles.container]}>
            <FlatList
                data={historial}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={[styles.item]}>
                        <Text style={[styles.itemText]}>Nombre: {item.usuario.nombre}</Text>
                        <Text style={[styles.itemText]}>Entrada: {formatDate(item.entrada)}</Text>
                        <Text style={[styles.itemText]}>Salida: {formatDate(item.salida)}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={[styles.itemText]}>No hay historial disponible.</Text>}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
    },
    itemText: {
        fontSize: width > 600 ? 22 : 18,
        color: '#16324F',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default Historial;