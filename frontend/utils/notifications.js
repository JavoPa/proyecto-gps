import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

function handleRegistrationError(errorMessage) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'web') {
        console.log('Este dispositivo es una versión web, no se necesitan notificaciones push.');
        return;
    }

    if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice){
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('FALLÓ OBTENER PERMISOS PARA NOTIFICACIONES');
            return;
        }

        

        try{
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            });
            console.log("TOKEN: ", token.data);
            return token.data;
        } catch (error){
            handleRegistrationError('FALLÓ OBTENER EL TOKEN DE NOTIFICACIONES');
        }
    }else{
        handleRegistrationError('DEBES USAR UN DISPOSITIVO FÍSICO PARA RECIBIR NOTIFICACIONES');
    }
}