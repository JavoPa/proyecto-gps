import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';

interface CardProps {
    title: string;
    body: string;
}

const Card: React.FC<CardProps> = ({ title, body }) => {
    return (
        <View style={[styles.card]}>
            <Text style={[styles.cardTitle]}>{title}</Text>
            <Text style={[styles.cardBody]}>{body}</Text>
        </View>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: width > 600 ? 30 : 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardBody: {
        fontSize: width > 600 ? 22 : 16,
        fontWeight: 'normal',
        marginBottom: 10,
    },
});

export default Card;