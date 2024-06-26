import { ExpireOption } from 'types';

export const DEFAULT_EXPIRE_TIME = 1000 * 60 * 30; // 30 minutes

export const isExpired = (expireOption: ExpireOption): boolean => {
  const expireTime = getLocalStorage<number>(expireOption.key);

  if (expireTime) {
    const currentTime = new Date().getTime();
    const validTime = expireOption.validTime ?? DEFAULT_EXPIRE_TIME;
    return currentTime - validTime > Number(expireTime);
  }

  return true;
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }

    return JSON.parse(serializedValue) as T;
  } catch (e) {
    console.error('Error getting data from localStorage', e);

    return null;
  }
};

export const setLocalStorage = <T>(key: string, value: T): boolean => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);

    return true;
  } catch (e) {
    console.error('Error saving to localStorage', e);

    return false;
  }
};

export const removeLocalStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(key);

    return true;
  } catch (e) {
    console.error('Error removing data from localStorage', e);

    return false;
  }
};

export const clearLocalStorage = (): boolean => {
  try {
    localStorage.clear();

    return true;
  } catch (e) {
    console.error('Error clearing data at localStorage', e);

    return false;
  }
};
