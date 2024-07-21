import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllIncidentes } from '@/services/incidentes.service';
import Colors from '@/constants/Colors';
import { formatDate } from '../../Utils';

// Listo

interface MostrarIncidentesProps {
    navigateTo: (component: string) => void;
}

const MostrarIncidentes: React.FC<MostrarIncidentesProps> = ({ navigateTo }) => {
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

    const renderItem = ({ item }: { item: Incidente }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{formatDate(item.fecha)}</Text>
            <Text style={styles.tableCell}>{item.hora}</Text>
            <Text style={styles.tableCell}>{item.lugar}</Text>
            <Text style={styles.tableCell}>{item.tipo}</Text>
            <Text style={styles.tableCell}>{item.descripcion}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container} horizontal>
            <View style={styles.table}>
                <View style={{ margin: 10 }}>
                    <Button title="Volver al menú de incidentes" onPress={() => navigateTo('IncidentesMenu')} />
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Fecha</Text>
                    <Text style={styles.tableHeaderText}>Hora</Text>
                    <Text style={styles.tableHeaderText}>Lugar</Text>
                    <Text style={styles.tableHeaderText}>Tipo</Text>
                    <Text style={styles.tableHeaderText}>Descripción</Text>
                </View>
                {error && (
                    <View>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
                {!error && incidentes.length === 0 && <Text>Cargando incidentes...</Text>}
                {!error && incidentes.length > 0 && (
                    <FlatList
                        data={incidentes}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </ScrollView>
    );
};

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
        minWidth: 600, // Ensure the table is wide enough
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: Colors.light.tint,
        padding: 10,
    },
    tableHeaderText: {
        flex: 1,
        width: '20%',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center', // Center items vertically in each row
    },
    tableCell: {
        width: '20%',
        paddingHorizontal: 5,
        textAlign: 'center',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        height: '100%', // Make sure the cell takes the full height of the row
    },
});

export default MostrarIncidentes;
