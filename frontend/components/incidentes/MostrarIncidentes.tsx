import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Modal, ScrollView, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllIncidentes } from '@/services/incidentes.service';
import { formatDate } from '../../Utils';

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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIncidente, setSelectedIncidente] = useState<Incidente | null>(null);
    const [consulta, setConsulta] = useState('');

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

    const handleModal = (id: string) => {
        const incidente = incidentes.find((inc) => inc.id === id);
        setSelectedIncidente(incidente || null);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Incidentes</Text>
            <ScrollView>
                {error && (
                    <View>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
                {!error && incidentes.length === 0 && <Text>Cargando incidentes...</Text>}
                {!error && incidentes.length > 0 && incidentes.map((item, index) => (
                    <Pressable
                        style={styles.vistaIncidente}
                        key={index}
                        onPress={() => handleModal(item.id)}
                    >
                        <Text style={styles.incidentes}>Fecha: {formatDate(item.fecha)}</Text>
                        <Text style={styles.incidentes}>Tipo: {item.tipo}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
                transparent={true}
            >
                <View style={styles.detalle}>
                    {selectedIncidente && (
                        <>
                            <Text>Fecha: {formatDate(selectedIncidente.fecha)}</Text>
                            <Text>Hora: {selectedIncidente.hora}</Text>
                            <Text>Lugar: {selectedIncidente.lugar}</Text>
                            <Text>Tipo: {selectedIncidente.tipo}</Text>
                            <Text>Descripción: {selectedIncidente.descripcion}</Text>
                            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                        </>
                    )}
                </View>
            </Modal>
            <Pressable style={styles.bo} onPress={() => navigateTo('IncidentesMenu')} >
                <Text style={styles.botonVolver}>Volver al menú de incidentes</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    vistaIncidente : {
        alignContent: 'center',
        backgroundColor: '#2e76e4',
        padding: 10,
        marginVertical: 8,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        elevation: 5,
    },
    incidentes : {
        fontSize: 19,
        marginVertical: 2,
        color: 'black',
        margin: 5,
    },
    detalle : {
        backgroundColor: '#0e4baa',
        padding: 30,
        borderRadius: 10,
        elevation: 5,
        margin: '12%',
        marginTop: '50%',
    },
    title : {
        fontSize: 30,
        marginVertical: 8,
        color: '#000',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        width: 'auto',
    },
    bo: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 10,
        alignItems: 'center',
        borderRightColor: '#000',
        borderWidth: 2,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    botonVolver : {
        fontSize: 19,
    }
});

export default MostrarIncidentes;
