import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { postJaula } from '@/services/jaula.service';
import { useNavigation } from '@react-navigation/native';

const CrearJaula: React.FC = () => {
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [identificador, setIdentificador] = useState('');

    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (ubicacion === '' || capacidad === '' || identificador === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        const nuevaJaula = {
            ubicacion,
            capacidad: parseInt(capacidad),
            identificador,
        };

        const response = await postJaula(nuevaJaula);

        if (response && response._id) {
            Alert.alert('Éxito', 'Jaula creada correctamente');
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Hubo un problema al crear la jaula');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nueva Jaula</Text>
            <TextInput
                style={styles.input}
                placeholder="Ubicación"
                value={ubicacion}
                onChangeText={setUbicacion}
            />
            <TextInput
                style={styles.input}
                placeholder="Capacidad"
                value={capacidad}
                onChangeText={setCapacidad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Identificador"
                value={identificador}
                onChangeText={setIdentificador}
            />
            <Button title="Guardar" onPress={handleSubmit} />
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        marginBottom: 16,
    },
});

export default CrearJaula;
