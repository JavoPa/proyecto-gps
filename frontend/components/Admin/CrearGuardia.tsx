import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { postGuardia } from '@/services/Guardias.service';
import { useNavigation } from '@react-navigation/native';

const GuardiaForm: React.FC = () => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fono, setFono] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [situacionLaboral, setSituacionLaboral] = useState('');

    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (rut === '' || nombre === '' || apellido === '' || fono === '' || correo === '' || password === '' || situacionLaboral === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
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
            Alert.alert('Éxito', 'Guardia creado correctamente');
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Hubo un problema al crear el guardia');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nuevo Guardia</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Situación Laboral"
                value={situacionLaboral}
                onChangeText={setSituacionLaboral}
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

export default GuardiaForm;