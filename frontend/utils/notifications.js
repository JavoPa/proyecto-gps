import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { handleError } from '../../backend/utils/errorHandler';

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

async function registerForPushNotificationsAsync() {
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

        const projectID = Constants?.expoConfig?.extra?.projectID ?? Constants?.easConfig?.projectID;

        if (!projectID) {
            handleRegistrationError('FALLÓ OBTENER EL ID DEL PROYECTO');
            return;
        }

        try{
            const pushTokenString =(await Notifications.getExpoPushTokenAsync({projectId,})).data;
            console.log("PUSH TOKEN STRING: ", pushTokenString);
            return pushTokenString;
        } catch (error){
            handleRegistrationError(`${e}`);
        }
    }else{
        handleRegistrationError('DEBES USAR UN DISPOSITIVO FÍSICO PARA RECIBIR NOTIFICACIONES');
    }
}