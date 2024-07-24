import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { postJaula, getJaulas } from '@/services/jaula.service';
import { useNavigation } from '@react-navigation/native';

const JaulaForm: React.FC = () => {
    const [ubicacion, setUbicacion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [identificador, setIdentificador] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (ubicacion === '' || capacidad === '' || identificador === '') {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        const newJaula = {
            ubicacion,
            capacidad: parseInt(capacidad, 10),
            identificador
        };

        const response = await postJaula(newJaula);

        if (response && response.message === "Jaula creada exitosamente") {
            getJaulas();
            Alert.alert('Éxito', 'Jaula creada correctamente');
            navigation.goBack();
        } else {
            setErrorMessage(response.message || 'No se pudo crear la jaula');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nueva Jaula</Text>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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

export default JaulaForm;

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
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
});
