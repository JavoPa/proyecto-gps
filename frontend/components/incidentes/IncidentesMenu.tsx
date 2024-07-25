import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IncidentesMenuProps {
    navigateTo: (component: string) => void;
}

const IncidentesMenu: React.FC<IncidentesMenuProps> = ({ navigateTo }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu de incidentes</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('MostrarIncidentes')}>
                <Text style={styles.buttonText}>Todos los incidentes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('IncidentesDia')}>
                <Text style={styles.buttonText}>Incidentes de un día</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('DescargarInforme')}>
                <Text style={styles.buttonText}>Informe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('RegistrarIncidente')}>
                <Text style={styles.buttonText}>Registrar incidente</Text>
            </TouchableOpacity>
            {/* Add more buttons for other functionalities here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#EDF2F4', // Light background color
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#13293D', // Dark blue color
    },
    button: {
        backgroundColor: '#2A628F', // Button background color
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        width: '80%', // Full width button
        alignItems: 'center',
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.8, // Shadow opacity for iOS
        shadowRadius: 2, // Shadow radius for iOS
    },
    buttonText: {
        color: '#FFFFFF', // White text color
        fontSize: 18,
        fontWeight: '600',
    },
});

export default IncidentesMenu;
