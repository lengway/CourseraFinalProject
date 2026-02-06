import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsMenu = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Settings')}
      accessibilityLabel="Open settings"
    >
      <Text style={styles.icon}>⚙️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
});

export default SettingsMenu;
