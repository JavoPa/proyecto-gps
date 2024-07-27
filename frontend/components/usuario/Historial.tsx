import React, { useState, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
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
    const { width } = useWindowDimensions();
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
        <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
            <FlatList
                data={historial}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={[styles.item, { padding: width * 0.04 }]}>
                        <Text style={[{ fontSize: width * 0.04 }]}>Nombre: {item.usuario.nombre}</Text>
                        <Text style={[{ fontSize: width * 0.04 }]}>Entrada: {formatDate(item.entrada)}</Text>
                        <Text style={[{ fontSize: width * 0.04 }]}>Salida: {formatDate(item.salida)}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={[{ fontSize: width * 0.04 }]}>No hay historial disponible.</Text>}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default Historial;