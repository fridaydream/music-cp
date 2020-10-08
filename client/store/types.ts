
interface ICounterType {
  count: number;
}

export interface IThemeType {
  theme: string
}

export interface ICounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  toJson: () => ICounterType;
}


export type IStoresKey = 'counterStore' | 'themeStore'


export interface NewsItem {
  id: string;
  title: string;
}

export interface IThemeStoreProps {
  theme: string;
  news: NewsItem[];
}

export interface IThemeStore {
  theme: string;
  news: NewsItem[];
  setTheme(str: string): void;
  getData(): Promise<NewsItem[]>;
  toJson(): IThemeStoreProps;
}

export interface IStores {
  counterStore: ICounterStore;
  themeStore: IThemeStore;
}

declare global {
  interface Window {
    __INITIAL__STATE__: IStores;
  }
}
