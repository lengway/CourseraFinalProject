import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { saveFavorite } from '../services/storage';

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    await saveFavorite(item);
    setMessage('Saved to favorites.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save to Favorites</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  message: {
    marginTop: 12,
    color: '#2f855a',
  },
});

export default DetailScreen;
