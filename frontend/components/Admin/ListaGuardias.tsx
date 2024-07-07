import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getGuardias } from '@/services/Guardias.service';

interface Guardia {
    _id: string;
    nombre: string;
    apellido: string;
}

const GuardiaList: React.FC = () => {
    const [guardias, setGuardias] = useState<Guardia[]>([]);

    useEffect(() => {
        fetchGuardias();
    }, []);

    const fetchGuardias = async () => {
        const response = await getGuardias();
        // Filtra elementos sin _id
        const validGuardias = response.filter((guardia: Guardia) => guardia._id !== undefined);
        setGuardias(validGuardias);
    };

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
});

export default GuardiaList;