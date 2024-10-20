import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useSearchBox } from 'react-instantsearch-core';
import { Ionicons } from '@expo/vector-icons';

export function SearchBox({ setQuery, setSearchResults }) {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);


  function setNewQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
    setQuery(newQuery);

    // If search query is empty, reset the search results
    if (newQuery === '') {
      setSearchResults([]);  // Clear search results when query is cleared
    }
  }

  return (
    <View style={styles.container}>
        <Ionicons name="search" size={14} style={styles.icon} />
        <TextInput
            style={styles.input}
            placeholderTextColor={'grey'}
            placeholder='Search for movies'
            ref={inputRef}
            value={inputValue}
            onChangeText={setNewQuery}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            autoCorrect={true}
            spellCheck={false}
            autoComplete="off"
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
      backgroundColor: '#000',
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
      color: 'white',
  },
});