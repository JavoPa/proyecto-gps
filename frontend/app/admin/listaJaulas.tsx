import { StyleSheet, TouchableOpacity } from 'react-native';
import ListaJaulas from '@/components/admin/listaJaulas';
import { Text, View } from '@/components/Themed';
import CrearJaula from "@/components/admin/crearJaula";
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function ListaJaulasScreen() {
    const [mostrarCrearJaula, setMostrarCrearJaula] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setMostrarCrearJaula(false);
        }, [])
    );

    return (
        <View style={styles.container}>
            {mostrarCrearJaula ? (
                <View>
                    <CrearJaula />
                    <TouchableOpacity style={styles.button} onPress={() => setMostrarCrearJaula(false)}>
                        <Text style={styles.buttonTitle}>Volver</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={() => setMostrarCrearJaula(true)}>
                        <Text style={styles.buttonTitle}>Añadir Jaula</Text>
                    </TouchableOpacity>
                    <ListaJaulas />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    button: {
        backgroundColor: '#2A628F',
        marginVertical: 10,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 16,
    },
});
