import { StyleSheet } from 'react-native';
import ListaJaulas from '@/components/admin/listaJaulas';
import { View } from '@/components/Themed';

export default function ListaJaulasScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ListaJaulas />
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
