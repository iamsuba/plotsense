import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface CardProps {
    title: string;
    content: string;
    onClose: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, onClose }) => {
    return (
        <View style={styles.overlay}>
            <View style={styles.card}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 18,
        color: 'red',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Card;