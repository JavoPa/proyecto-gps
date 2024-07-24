import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { postGuardia, getGuardias } from '@/services/gestion.service';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const GuardiaForm: React.FC = () => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fono, setFono] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [situacionLaboral, setSituacionLaboral] = useState('Contratado');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (rut === '' || nombre === '' || apellido === '' || fono === '' || correo === '' || password === '') {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        const newGuardia = {
            rut,
            nombre,
            apellido,
            fono,
            correo,
            password,
            rol: 'Guardia', 
            cargo: 'Guardia',
            situacion_laboral: situacionLaboral
        };

        const response = await postGuardia(newGuardia);

        if (response && response._id) {
            getGuardias();
            Alert.alert('Éxito', 'Guardia creado correctamente');
            navigation.goBack();
        } else {
            setErrorMessage(response.message || 'No se pudo crear el guardia');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nuevo Guardia</Text>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TextInput
                style={styles.input}
                placeholder="RUT"
                value={rut}
                onChangeText={setRut}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={fono}
                onChangeText={setFono}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>Situación Laboral</Text>
                <Picker
                    selectedValue={situacionLaboral}
                    onValueChange={(itemValue) => setSituacionLaboral(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Contratado" value="Contratado" />
                    <Picker.Item label="Despedido" value="Despedido" />
                </Picker>
            </View>
            <Button title="Guardar" onPress={handleSubmit} />
        </View>
    );
};

export default GuardiaForm;

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
    pickerContainer: {
        marginBottom: 16,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        width: '100%',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
});

