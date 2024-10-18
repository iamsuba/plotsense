import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { collection, getDocs, query, orderBy, limit, startAfter, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchBar } from "@/components/SearchBar";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { Link } from "expo-router";

export default function Index() {

  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [lastVisibleMovie, setLastVisibleMovie] = useState(null); // Track the last visible document
  const [loading, setLoading] = useState(false); // For showing a loading spinner
  const [isEndReached, setIsEndReached] = useState(false); // To avoid multiple triggers for fetchMore
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  // Set the limit for the number of movies to fetch per page
  const MOVIE_FETCH_LIMIT = 12;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      // Create a query for Firestore to fetch movies ordered by a field and limited
      let q = query(
        collection(db, 'movies'),
        orderBy('release_year', 'desc'),
        limit(MOVIE_FETCH_LIMIT)
      );

      // If we already have a last visible movie, start after it for pagination
      if (lastVisibleMovie) {
        q = query(q, startAfter(lastVisibleMovie));
      }

      const movieSnapshot = await getDocs(q);

      if (!movieSnapshot.empty) {
        const movieList = movieSnapshot.docs.map(doc => doc.data());

        setMovies((prevMovies) => [...prevMovies, ...movieList]); // Append new movies to the list
        setLastVisibleMovie(movieSnapshot.docs[movieSnapshot.docs.length - 1]); // Track the last movie

        // If fewer movies than the limit are returned, it means we've reached the end
        if (movieList.length < MOVIE_FETCH_LIMIT) {
          setIsEndReached(true);
        }
      } else {
        setIsEndReached(true); // No more movies to fetch
      }

    } catch (error) {
      console.error("Error fetching movies: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch movies based on the search query
  const searchMovies = async (queryText) => {
    console.log("Searching for: ", queryText);

    try {
      const moviesRef = collection(db, 'movies');
      // Query the movies collection where the title contains the search query
      const q = query(moviesRef, where('title', '>=', queryText), where('title', '<=', queryText + '\uf8ff'));
      const querySnapshot = await getDocs(q);
      const matchingMovies = querySnapshot.docs.map(doc => doc.data());
      setSearchResults(matchingMovies);
    } catch (error) {
      console.error("Error searching movies: ", error);
    }
  };

  // Call the fetchMovies function to retrieve movies from Firestore when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  // Function to handle loading more movies when the user scrolls to the end
  const handleLoadMore = () => {
    if (!isEndReached && !loading) {
      fetchMovies(); // Fetch more movies
    }
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <Image source={require('@/assets/images/background.png')} style={styles.headerBackground} />
      <View style={styles.overlay} />
      <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
              <Text style={styles.subtitle}>Your AI companion to elevate your watching experience</Text>
              {/* <SearchBar style={styles.searchBar} placeholder="Search for movies" /> */}
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={14} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for movies"
                    value={searchQuery}
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => {
                      setSearchQuery(text);
                      searchMovies(text);
                    }}
                />
              </View>
              {searchQuery.length > 0 && (
                <View style={styles.searchResultsContainer}>
                  <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.searchResultItem}
                        onPress={() => {
                          setSearchQuery(''); // Clear the search query
                          setSearchResults([]); // Clear the search results
                          navigation.navigate('Details', { movie: JSON.stringify(item) }); // Navigate to the movie details
                        }}
                      >
                        <Text style={styles.searchResultText}>{item.title}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.movie_id}
                  />
                </View>
              )}
            </View>
                <View style={styles.listContainer}>
                <FlatList
                  data={movies}
                  numColumns={3}
                  renderItem={({ item }) => (
                  <TouchableOpacity style={styles.movieContainer}>
                    <ImageBackground
                    source={{ uri: item.poster_url }}
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
                  keyExtractor={(item) => item.movie_id}
                  onEndReached={handleLoadMore} // Load more when end is reached
                  onEndReachedThreshold={0.5}  // When to trigger load more (0.5 = halfway)
                  refreshing={loading} // Show loading spinner when refreshing
                  onRefresh={() => {
                  setMovies([]); // Clear the current movies
                  setLastVisibleMovie(null); // Reset the last visible movie
                  setIsEndReached(false); // Reset the end reached flag
                  fetchMovies(); // Fetch movies again
                  }} // Reload when pull down
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
    maxWidth: '30%',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 8,
    color: 'lightgray',
    marginTop: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 20,
    color: 'white',
  },
  searchResultsContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});