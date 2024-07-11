import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
    title: string;
    body: string;
}

const Card: React.FC<CardProps> = ({ title, body }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardBody}>{body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minWidth: 150,
        alignItems: 'center',
        marginBottom: 30,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardBody: {
        fontSize: 14,
        fontWeight: 'normal',
        marginBottom: 10,
    },
});

export default Card;