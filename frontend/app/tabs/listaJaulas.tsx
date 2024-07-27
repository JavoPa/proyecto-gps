import { StyleSheet } from 'react-native';
import ListaJaulas from '@/components/usuario/listaJaulas';
import { View } from '@/components/Themed';

export default function ListaJaulasScreen() {
    return (
        <View style={styles.container}>
            <ListaJaulas />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: '1%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
