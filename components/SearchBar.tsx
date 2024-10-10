import React from 'react';
import { TextInput, type TextInputProps, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

export type ThemedSearchBarProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
};

export function SearchBar({
    style,
    lightColor,
    darkColor,
    ...rest
}: ThemedSearchBarProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={14} style={styles.icon} />
            <TextInput
                style={[styles.input, { color }]}
                placeholderTextColor={'grey'}
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    icon: {
        marginRight: 8,
        color: 'lightgray',
        marginTop: 4,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 20,
    },
});
