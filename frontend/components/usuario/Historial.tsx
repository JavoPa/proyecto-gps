import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getHistorialUsuario } from '@/services/historial.service'; // Asegúrate de que la ruta sea correcta

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

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const data = await getHistorialUsuario();
                setHistorial(data);
            } catch (error) {
                setError('No se pudo cargar el historial');
                Alert.alert('Error', 'No se pudo cargar el historial');
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial();
    }, []);

    const formatDate = (date: string | null) => {
        return date ? new Date(date).toLocaleString() : 'null';
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={historial}
                keyExtractor={(item) => item._id} // Usa _id como clave única
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Entrada: {formatDate(item.entrada)}</Text>
                        <Text>Salida: {formatDate(item.salida)}</Text>
                        <Text>Usuario: {item.usuario.nombre}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No hay historial disponible.</Text>}
                // Puedes agregar un estilo adicional si deseas
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    listContent: {
        paddingBottom: 20, // Ajusta según sea necesario para el padding en la parte inferior
    },
});

export default Historial;