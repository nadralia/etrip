import AsyncStorage from '@react-native-community/async-storage';

export const saveLocalData = (key, value) => {
	return AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getLocalData = async (key) => {
	let user = await AsyncStorage.getItem(key);
	if (user) return JSON.parse(user);
	return null;
};

export const removeLocalData = async (key) => {
	return await AsyncStorage.removeItem(key);
};
