import { StyleSheet } from 'react-native';
import CrearJaula from '@/components/admin/crearJaula';
import { View } from '@/components/Themed';

export default function CrearJaulaScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <CrearJaula />
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
