export interface ExpireOption {
  validTime?: number;
}

export interface LocalCacheOption<T, P extends Array<unknown>> {
  key: string;
  expireOption: ExpireOption;
  fn: (...args: P) => Promise<T>;
  fnProps?: P;
}
