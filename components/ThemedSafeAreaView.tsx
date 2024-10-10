import { SafeAreaView } from 'react-native-safe-area-context';
import { ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedSafeAreaViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedSafeAreaView({ style, lightColor, darkColor, ...otherProps }: ThemedSafeAreaViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return <SafeAreaView edges={['right', 'top', 'left']} style={[{ backgroundColor }, style]} {...otherProps} />;
}