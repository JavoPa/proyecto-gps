import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
            alert('Jaula creada correctamente. Se recomienda comprobar que la ubicación se muestra correctamente en Google Maps');
            navigation.goBack();
        } else {
            setErrorMessage(response.message || 'No se pudo crear la jaula');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nueva Jaula</Text>
            <Text style={styles.helpText}>Recomendamos ingresar las coordenadas de la ubicación para mayor precisión.</Text>
            <TextInput
                style={styles.input}
                placeholder="Ubicación"
                value={ubicacion}
                onChangeText={setUbicacion}
            />

            <TextInput
                style={styles.input}
                placeholder="Identificador"
                value={identificador}
                onChangeText={setIdentificador}
            />
            <TextInput
                style={styles.input}
                placeholder="Capacidad"
                value={capacidad}
                onChangeText={setCapacidad}
                keyboardType="numeric"
            />
            <Button title="Guardar" onPress={handleSubmit} color="#2A628F" />
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        </View>
    );
};

export default JaulaForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#EDF2F4', // Fondo de la app
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#13293D', // Color de texto principal
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        marginBottom: 16,
        backgroundColor: '#FFFFFF', // Fondo del input
    },
    helpText: {
        fontSize: 12,
        color: '#6c757d',
        marginBottom: 16,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#2A628F', // Color de los botones
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // Color del texto de los botones
        fontSize: 16,
    },
});
