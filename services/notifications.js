import * as Notifications from 'expo-notifications';

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const triggerTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Test Notification',
      body: 'This is a local test notification from the app.',
    },
    trigger: null,
  });
};
