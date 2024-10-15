import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

export default function Details() {
    const { movie } = useLocalSearchParams();
    const movieData = movie ? JSON.parse(movie) : {};

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={movieData.image} style={styles.image} />
                </View>

                <View style={styles.detailsContainer}>
                    
                    <Text style={styles.title}>{movieData.title}</Text>
                    <Text style={styles.description}>The Dark Knight follows Batman as he faces his greatest challenge yet: the Joker, a chaotic criminal mastermind. As the Joker wreaks havoc on Gotham City, Batman must confront his own limits and make tough choices to protect the city. The film delves into themes of heroism, morality, and the fine line between order and chaos.</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Plot Layers</Text>
                        <ScrollView horizontal style={styles.sectionCardsContainer}>
                            {movieData.plot_layers && movieData.plot_layers.map((layer, index) => (
                                <View key={index} style={styles.card}>
                                    <Text style={styles.cardTitle}>{layer.title}</Text>
                                    <Text style={styles.theme}>{layer.theme}</Text>
                                    <Text style={styles.cardDescription}>{layer.description}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quotes</Text>
                        <ScrollView horizontal style={styles.sectionCardsContainer}>
                            {movieData.quotes && movieData.quotes.map((quote, index) => (
                                <View key={index} style={styles.card}>
                                    <Text style={styles.cardTitle}>"{quote.quote}"</Text>
                                    <Text style={styles.cardDescription}>- {quote.explanation}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageContainer: {
        width: '100%',
        height: 300,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    detailsContainer: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: 'grey',
        marginTop: 8,
        fontWeight: '300',
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        color: 'white',
    },
    sectionCardsContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    card: {
        width: 150,
        backgroundColor: '#11303E',
        padding: 12,
        borderRadius: 8,
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    theme: {
        fontSize: 12,
        color: 'white',
        marginTop: 2,
        fontWeight: '300',
        fontStyle: 'italic',
    },
    cardDescription: {
        fontSize: 12,
        color: '#718892',
        marginTop: 8,
        fontWeight: '300',
    },
});
