import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface NotificationSenderProps {
    jaulaId: string; // Assuming jaulaId is a string, adjust type if different
  }

const NotificationSender: React.FC<NotificationSenderProps> = ({ jaulaId }) => {
  const [notificationSent, setNotificationSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendNotification = async () => {
    try {
      // Fetch guardia's push token
      const response = await axios.get(`/jaulas/${jaulaId}/guardia`);
      const guardiaData = response.data;

      // Assuming guardiaData contains a property 'pushToken' with the guardia's Expo push token
      const pushToken = guardiaData.pushToken;

      // Send notification
      const notificationResponse = await axios.post(`/users/notif`, {
        tokens: [pushToken],
        message: 'test'
      });

      setNotificationSent(true);
    } catch (error) {
      console.error('Error sending notification:', error);
      setError('Failed to send notification');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={handleSendNotification} />
      {notificationSent && <Text style={styles.successText}>Notificación enviada</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  successText: {
    marginTop: 10,
    color: 'green'
  },
  errorText: {
    marginTop: 10,
    color: 'red'
  }
});

export default NotificationSender;
