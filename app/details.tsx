import React, { useState, useRef } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, ImageBackground, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Details() {
    const { movie } = useLocalSearchParams();
    console.log(movie);
    const movieData = movie ? JSON.parse(movie) : {};
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false); // Control modal visibility
    const [selectedCardIndex, setSelectedCardIndex] = useState(0); // Index of the selected card
    const [selectedCategory, setSelectedCategory] = useState('plot_layers'); // Selected category
    const scrollRef = useRef();

    // Open the modal with the tapped card
    const openModal = (index, category) => {
        setSelectedCardIndex(index);
        setSelectedCategory(category);
        setModalVisible(true);
    };

    // Close the modal
    const closeModal = () => {
        setModalVisible(false);
    };

    const scrollToSelectedCard = () => {
        // Scroll to the selected card when modal opens
        scrollRef.current?.scrollTo({
            x: selectedCardIndex * 320, // Adjust this value based on card width
            animated: true,
        });
    };


    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <ImageBackground source={{ uri: movieData.backdrop_url }} style={styles.image} resizeMode='cover'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle" color="white" style={styles.actionIcons} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>

                <View style={styles.detailsContainer}>
                    
                    <Image source={{ uri: movieData.poster_url }} style={styles.posterImage} />
                    <Text style={styles.title}>{movieData.title}</Text>
                    <Text style={styles.description}>{movieData.overview}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Plot Layers</Text>
                        <ScrollView horizontal style={styles.sectionCardsContainer}>
                            {movieData.plot_layers && movieData.plot_layers.map((layer, index) => (
                                <TouchableOpacity key={index} onPress={() => openModal(index, 'plot_layers')} style={styles.card}>
                                    <Text style={styles.cardTitle}>{layer.title}</Text>
                                    <Text style={styles.theme}>{layer.theme}</Text>
                                    <Text style={styles.cardDescription}>{layer.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quotes</Text>
                        <ScrollView horizontal style={styles.sectionCardsContainer}>
                            {movieData.quotes && movieData.quotes.map((quote, index) => (
                                <TouchableOpacity key={index} onPress={() => openModal(index, 'quotes')} style={styles.card}>
                                    <Text style={styles.cardTitle}>"{quote.quote}"</Text>
                                    <Text style={styles.cardDescription}>- {quote.explanation}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                </View>

            
                <Modal visible={isModalVisible} transparent={true} animationType="fade" onShow={scrollToSelectedCard}>
                    <View style={styles.modalOverlay}>
                        <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 36, right: 20 }}>
                            <Ionicons name="close-circle" color="white" size={36} />
                        </TouchableOpacity>

                            {selectedCategory === 'plot_layers' && (
                                <ScrollView ref={scrollRef} horizontal style={styles.modalCardContainer}>
                                    {movieData.plot_layers && movieData.plot_layers.map((layer, index) => (
                                        <View key={index} style={[styles.modalCard, index == 0 && styles.modalCardFirstChild, index == movieData.plot_layers.length - 1 && styles.modalCardLastChild]}>
                                            <Text style={styles.modalCardTitle}>{layer.title}</Text>
                                            <Text style={styles.modalCardTheme}>{layer.theme}</Text>
                                            <Text style={styles.modalCardDescription}>{layer.description}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}

                            {selectedCategory === 'quotes' && (
                                <ScrollView ref={scrollRef} horizontal style={styles.modalCardContainer}>
                                    {movieData.quotes && movieData.quotes.map((quote, index) => (
                                        <View key={index} style={[styles.modalCard, index == 0 && styles.modalCardFirstChild, index == movieData.quotes.length - 1 && styles.modalCardLastChild]}>
                                            <Text style={styles.modalCardTitle}>"{quote.quote}"</Text>
                                            <Text style={styles.modalCardDescription}>- {quote.explanation}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}

                    </View>
                </Modal>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 3,
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    posterImage: {
        width: 120,
        height: 180,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: -160,
        marginBottom: 24,
        borderWidth: 4,
        borderColor: '#11303E',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark overlay
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCardContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    modalCard: {
        width: 300,
        height: 400,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Added opacity of 0.7
        borderColor: '#11303E',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
    },
    modalCardFirstChild: {
        marginLeft: 30,
    },
    modalCardLastChild: {
        marginRight: 30,
    },
    modalCardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00bfff',
        marginBottom: 10,
    },
    modalCardTheme: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#aaa',
        marginBottom: 15,
    },
    modalCardDescription: {
        fontSize: 16,
        color: '#ddd',
    },
    actionIcons: {
        fontSize: 36,
        position: 'absolute',
        top: 36,
        left: 20,
    },
});
