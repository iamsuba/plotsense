import { ScrollView, Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SearchBar } from "@/components/SearchBar";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

const movies = [
  { title: "Shawshank Redemption", image: "shawshank.png" },
  { title: "The Godfather", image: "thegodfather.png" },
  { title: "The Dark Knight", image: "thedarkknight.png" },
  { title: "The Godfather Part II", image: "thegodfather2.png" },
  { title: "12 Angry Men", image: "angrymen12.png" },
  { title: "The Lord of the Rings", image: "lordofrings.png" },
  { title: "Schindler's List", image: "schindlerlist.png" },
  { title: "Pulp Fiction", image: "pulpfiction.png" },
  { title: "The Lord of the Rings: The Two Towers", image: "lordofrings2.png" },
  { title: "The Good, The Bad and The Ugly", image: "thegoodthebadtheugly.png" },
  { title: "Forrest Gump", image: "forrestgump.png" },
  { title: "Fight Club", image: "fightclub.png" }
];

const imageMap = {
  shawshank: require('@/assets/images/movies/shawshank.png'),
  thegodfather: require('@/assets/images/movies/thegodfather.png'),
  thedarkknight: require('@/assets/images/movies/thedarkknight.png'),
  thegodfather2: require('@/assets/images/movies/thegodfather2.png'),
  angrymen12: require('@/assets/images/movies/12angrymen.png'),
  lordofrings: require('@/assets/images/movies/lordofrings.png'),
  schindlerlist: require('@/assets/images/movies/schindlerlist.png'),
  pulpfiction: require('@/assets/images/movies/pulpfiction.png'),
  lordofrings2: require('@/assets/images/movies/lordofrings2.png'),
  thegoodthebadtheugly: require('@/assets/images/movies/thegoodthebadtheugly.png'),
  forrestgump: require('@/assets/images/movies/forrestgump.png'),
  fightclub: require('@/assets/images/movies/fightclub.png')
};

export default function Index() {
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
                      <Image
                        source={imageMap[item.image.split('.')[0] as keyof typeof imageMap]}
                        style={styles.movieImage}
                      />
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
});