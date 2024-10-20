import React, {useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { useInfiniteHits, useSearchBox } from 'react-instantsearch-core';
import { Link } from 'expo-router';

export function InfiniteHits({ setSearchResults, query }) {
    const { items, isLastPage, showMore } = useInfiniteHits();

    useEffect(() => {
        //console.log(query);
        //console.log(items);
        if (query.length > 0) {
            setSearchResults(items);
        }
    }, [query]);

return null;
};