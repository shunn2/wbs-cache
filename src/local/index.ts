import {
  clearLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage';

export default class LocalCache {
  public getItem<T>(key: string): T | null {
    const value = getLocalStorage<T>(key);

    return value;
  }

  public setItem<T>(key: string, value: T): boolean {
    const result = setLocalStorage<T>(key, value);

    return result;
  }

  public removeItem(key: string): boolean {
    const result = removeLocalStorage(key);

    return result;
  }

  public clear(): boolean {
    const result = clearLocalStorage();

    return result;
  }
}
