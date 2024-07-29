import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { postGuardia } from '@/services/gestion.service';
import { useNavigation, useFocusEffect, CommonActions  } from '@react-navigation/native';

const GuardiaForm: React.FC = () => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fono, setFono] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setRut('');
            setNombre('');
            setApellido('');
            setFono('');
            setCorreo('');
            setPassword('');
            setError(null);

            return () => {
                setRut('');
                setNombre('');
                setApellido('');
                setFono('');
                setCorreo('');
                setPassword('');
                setError(null);
            };
        }, [])
    );

    const handleSubmit = async () => {
        const newGuardia = {
            rut,
            nombre,
            apellido,
            fono,
            correo,
            password,
            rol: 'Guardia',
            cargo: 'Guardia',
            situacion_laboral: 'Vigente'
        };

        const response = await postGuardia(newGuardia);

        if (response && response._id) {
            Alert.alert('Éxito', 'Guardia creado correctamente');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'listaGuardias' }],
                })
            );
        } else {
            setError(response.message || 'Hubo un error al crear el guardia');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
                {error && (
                    <View>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default GuardiaForm;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        backgroundColor: '#FFFFFF',
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
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#2A628F',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
