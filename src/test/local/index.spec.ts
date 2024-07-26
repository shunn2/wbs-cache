import LocalStorageService from '@src/utils/localStorage';

const localStorageService = new LocalStorageService();

describe('setLocalStorage', () => {
  it('set value ', () => {
    const key = 'test';
    const value = 'test value';

    const result = localStorageService.setLocalStorage<string>(key, value);

    expect(result).toBe(true);
  });

  it('error at set value', () => {
    const key = 'null';
    // 실패케이스 5MB
    const value = 'x'.repeat(5 * 1024 * 1024);

    const result = localStorageService.setLocalStorage<unknown>(key, value);

    expect(result).toBe(false);
  });
});

describe('getLocalStorage', () => {
  it('get value ', () => {
    const key = 'test';

    const result = localStorageService.getLocalStorage<string>(key);

    expect(result).toBe('test value');
  });

  it('error at get value', () => {
    const key = 'not exist key';

    const result = localStorageService.getLocalStorage<unknown>(key);

    expect(result).toBe(null);
  });
});
