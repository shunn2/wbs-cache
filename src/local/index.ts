import LocalStorageService from '@utils/localStorage';
import { LocalCacheOption } from '@src/types';

export default class LocalCache {
  protected localStorageService: LocalStorageService =
    new LocalStorageService();

  public getItem<T>(key: string): T | null {
    const value = this.localStorageService.getLocalStorage<T>(key);

    return value;
  }

  public setItem<T>(key: string, value: T): boolean {
    const result = this.localStorageService.setLocalStorage<T>(key, value);

    return result;
  }

  public removeItem(key: string): boolean {
    const result = this.localStorageService.removeLocalStorage(key);

    return result;
  }

  public clear(): boolean {
    const result = this.localStorageService.clearLocalStorage();

    return result;
  }

  public async retrieve<T, P extends Array<unknown>>(
    options: LocalCacheOption<T, P>
  ): Promise<T> {
    const { key, expireOption, fn, fnProps = [] as unknown as P } = options;
    const expiredKey = key + '_EXPIRED';
    const isExpired = this.localStorageService.isExpired(
      expiredKey,
      expireOption
    );

    const value = this.getItem<T>(key);

    if (isExpired || !value) {
      const result = await fn(...fnProps);
      this.setItem(key, result);
      this.setItem(expiredKey, new Date().getTime());

      return result;
    }

    return value;
  }
}
