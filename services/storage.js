import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async () => {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFavorite = async (item) => {
  const favorites = await getFavorites();
  const exists = favorites.some((favorite) => favorite.id === item.id);
  if (!exists) {
    const updated = [...favorites, item];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  }
  return favorites;
};
