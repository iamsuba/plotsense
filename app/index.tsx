import { ScrollView, Text, View, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchBar } from "@/components/SearchBar";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { Link } from "expo-router";
import { movies } from "@/app/moviedata";

export default function Index() {

  const navigation = useNavigation();

  return (
    <ThemedSafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/background.png')} style={styles.headerBackground} />
      <View style={styles.overlay} />
      <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
              <Text style={styles.subtitle}>Your AI companion to elevate your watching experience</Text>
              <SearchBar style={styles.searchBar} placeholder="Search for movies" />
            </View>
              <View style={styles.listContainer}>
                <FlatList
                  data={movies}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.movieContainer}>
                      <ImageBackground
                        source={item.image}
                        style={styles.movieImage}>
                          <Link 
                            href= {{
                              pathname: '/details',
                              params: { movie: JSON.stringify(item) }
                            }}
                            style={styles.linkContainer} />
                        </ImageBackground>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.title}
                />
              </View>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    height: '100%', // Add this line to make the image occupy full height of header
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Add this line to set the overlay color and opacity
  },
  logo: {
    width: 183,
    height: 55,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  searchBar: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 20,
    backgroundColor: 'black',
    flex: 1,
  },
  movieContainer: {
    flex: 1,
    margin: 6,
    borderRadius: 8,
    width: '30%',
    height: 150,
  },
  movieImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  linkContainer: {
    flex: 1,
  },
});