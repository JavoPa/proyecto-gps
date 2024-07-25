import { StyleSheet } from 'react-native';
import ListaUsuariosConBicicleta from '@/components/guardia/ListaUsuariosConBicicleta';
import { View } from '@/components/Themed';

export default function ListaUsuariosScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ListaUsuariosConBicicleta />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
