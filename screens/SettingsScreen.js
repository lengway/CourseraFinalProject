import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestNotificationPermissions, triggerTestNotification } from '../services/notifications';

const DARK_MODE_KEY = 'setting_dark_mode';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const stored = await AsyncStorage.getItem(DARK_MODE_KEY);
      if (stored !== null) {
        setDarkMode(stored === 'true');
      }
      const granted = await requestNotificationPermissions();
      setPermissionStatus(granted ? 'Notifications enabled' : 'Notifications disabled');
    };

    loadSettings();
  }, []);

  const handleDarkModeToggle = async (value) => {
    setDarkMode(value);
    await AsyncStorage.setItem(DARK_MODE_KEY, String(value));
  };

  const handleNotification = async () => {
    await triggerTestNotification();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.optionRow}>
        <Text style={styles.optionLabel}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={handleDarkModeToggle} />
      </View>
      <View style={styles.optionRow}>
        <Text style={styles.optionLabel}>Email Alerts</Text>
        <Switch value={emailAlerts} onValueChange={setEmailAlerts} />
      </View>
      <View style={styles.optionRow}>
        <Text style={styles.optionLabel}>Push Notifications</Text>
        <Text style={styles.status}>{permissionStatus}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNotification}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  optionRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  status: {
    color: '#4a5568',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#2b6cb0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SettingsScreen;
