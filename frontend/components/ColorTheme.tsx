//Funcion para obtener el color del tema (claro/oscuro) en base al esquema de color del dispositivo o en web (light)
import { useColorScheme, Platform } from 'react-native';

export default function ColorTheme() {
    //Establecer el esquema de color, si es web se establece en light
    let colorScheme = useColorScheme();
    if (Platform.OS === 'web') {
    colorScheme = 'light';
    }
    return colorScheme;
}   