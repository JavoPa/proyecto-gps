
import { Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useSession } from '@/flo';
import { Redirect } from 'expo-router';

export default function ModalScreen() {
    const {signOut} = useSession();
    const cerrarSession = () => {
        signOut();
        <Redirect href="/login" />;
    }
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Gestiona tu usuarios</Text>
            <Pressable
                onPress={signOut}
                style={styles.botonCerrar}
            >
                <Text>Cerrar session</Text>
            </Pressable>
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
  botonCerrar:{
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  }
});
