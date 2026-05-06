import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TOKEN: '@truckinfo:token',
  BIOMETRIC_ENABLED: '@truckinfo:biometricEnabled',
  USER_NAME: '@truckinfo:userName',
};

export const authStorage = {
  saveToken: async (token: string) => {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  },

  getToken: async (): Promise<string | null> => {
    return AsyncStorage.getItem(KEYS.TOKEN);
  },

  clearToken: async () => {
    await AsyncStorage.removeItem(KEYS.TOKEN);
  },

  setBiometricEnabled: async (enabled: boolean) => {
    await AsyncStorage.setItem(KEYS.BIOMETRIC_ENABLED, enabled ? '1' : '0');
  },

  isBiometricEnabled: async (): Promise<boolean> => {
    const val = await AsyncStorage.getItem(KEYS.BIOMETRIC_ENABLED);
    return val === '1';
  },

  saveUserName: async (name: string) => {
    await AsyncStorage.setItem(KEYS.USER_NAME, name);
  },

  getUserName: async (): Promise<string | null> => {
    return AsyncStorage.getItem(KEYS.USER_NAME);
  },

  clearAll: async () => {
    await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.BIOMETRIC_ENABLED, KEYS.USER_NAME]);
  },
};
