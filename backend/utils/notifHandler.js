const { Expo } = require('expo-server-sdk');
const { handleError } = require("../utils/errorHandler");
let expo = new Expo();

async function enviarPushNotification(tokens, message) {
    let messages = [];
    for (let pushToken of tokens) {
        try {
            // IMPORTANTE PARA VERIFICAR SI ES UN PUSH TOKEN VÁLIDO
            if (!Expo.isExpoPushToken(pushToken)) {
                handleError(null, "notifHandler -> enviarPushNotification\n🗯  Push token inválido");
                continue;
            }
            messages.push({
                to: pushToken,
                sound: 'default',
                title: '⏰ BICICLETERO CERRADO ⏰',
                body: message,
                data: { message }
            });
        }catch (error){
            handleError(error, "notifHandler -> enviarPushNotification");
        }
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            handleError(error, "notifHandler -> enviarPushNotification");
        }
    }
    return tickets;
}

async function enviarNotifSingular(pushToken, message) {
    try {
        // IMPORTANTE PARA VERIFICAR SI ES UN PUSH TOKEN VÁLIDO
        if (!Expo.isExpoPushToken(pushToken)) {
            handleError(null, "notifHandler -> enviarPushNotification\n🗯  Push token inválido");
            return null;
        }

        let messagePayload = {
            to: pushToken,
            sound: 'default',
            title: 'Bicicletero UBB',
            body: message,
            data: { message }
        };

        let tickets = await expo.sendPushNotificationsAsync([messagePayload]);
        return tickets;
    } catch (error) {
        handleError(error, "notifHandler -> enviarPushNotification");
        return null;
    }
}

module.exports = {
    enviarPushNotification,
    enviarNotifSingular
};