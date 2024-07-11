import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface IncidentesMenuProps {
    navigateTo: (component: string) => void;
}

const IncidentesMenu: React.FC<IncidentesMenuProps> = ({ navigateTo }) => {
    return (
        <View style={styles.container}>
            <Button title="Todos los incidentes" onPress={() => {
                navigateTo('MostrarIncidentes');
            }} />
            <Button title="Incidentes de un día" onPress={() => {
                navigateTo('IncidentesDia');
            }} />
            <Button title="Informe" onPress={() => {
                navigateTo('DescargarInforme');
            }} />
            <Button title="Registrar incidente" onPress={() => {
                navigateTo('RegistrarIncidente');
            }} />
            {/* Add more buttons for other functionalities here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default IncidentesMenu;
