import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, title, style, textStyle, ...props }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.button,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.light.buttonText,
        fontSize: 16,
    },
});

export default CustomButton;