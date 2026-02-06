import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getPosts } from '../services/api';
import { getFavorites } from '../services/storage';
import SettingsMenu from './SettingsMenu';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Expo App',
      headerRight: () => <SettingsMenu />,
    });
  }, [navigation]);

  const loadFavorites = async () => {
    const favorites = await getFavorites();
    setFavoritesCount(favorites.length);
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data.slice(0, 20));
      setError('');
    } catch (err) {
      setError('Unable to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={2}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Favorites saved: {favoritesCount}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#2b6cb0" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#4a5568',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 16,
  },
  cardBody: {
    color: '#4a5568',
  },
  error: {
    color: '#b91c1c',
    padding: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
