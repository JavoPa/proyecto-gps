import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getAllIncidentes } from '@/services/incidentes.service';
import Colors from '@/constants/Colors';

export default function MostrarIncidentes() {
    interface Incidente {
        id: string;
        fecha: Date;
        hora: string;
        lugar: string;
        tipo: string;
        descripcion: string;
    }

    const [incidentes, setIncidentes] = useState<Incidente[]>([]);
    const [error, setError] = useState<string | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            getAllIncidentes().then((response) => {
                switch (response.status) {
                    case 200:
                        const incidentesData = response.data.data.map((incidente: any) => ({
                            ...incidente,
                            fecha: new Date(incidente.fecha),
                        }));
                        setIncidentes(incidentesData);
                        setError(null);
                        break;

                    default:
                        setError(response.message || 'Hubo un error al cargar los incidentes 🛑');
                        break;
                }
            }).catch((error) => {
                setError(error.message || 'Hubo un error al cargar los incidentes 🛑');
            });
        }, [])
    );

    return (
        <ScrollView style={styles.container}>
            {error && (
                <View>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            {!error && incidentes.length === 0 && <Text>Cargando incidentes...</Text>}
            {!error && incidentes.length > 0 && (
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Fecha</Text>
                        <Text style={styles.tableHeaderText}>Hora</Text>
                        <Text style={styles.tableHeaderText}>Lugar</Text>
                        <Text style={styles.tableHeaderText}>Tipo</Text>
                        <Text style={styles.tableHeaderText}>Descripción</Text>
                    </View>
                    {incidentes.map((incidente, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{incidente.fecha.toLocaleDateString()}</Text>
                            <Text style={styles.tableCell}>{incidente.hora}</Text>
                            <Text style={styles.tableCell}>{incidente.lugar}</Text>
                            <Text style={styles.tableCell}>{incidente.tipo}</Text>
                            <Text style={styles.tableCell}>{incidente.descripcion}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: Colors.light.tint,
        padding: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
});