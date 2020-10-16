
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

export interface Info {
  id?: number;
  avatar_url?: string;
  url?: string;
  name?: string;
}

export interface LoginResponse {
  data: Info;
}

interface User {
  isLogin: boolean;
  info: Info;
}

export interface IAppStore {
  user: User
  login: (code: string) => Promise<unknown>;
  toJson(): { user: User };
  init(arg0: User): void;
}

export interface IStores {
  counterStore: ICounterStore;
  themeStore: IThemeStore;
  appStore: IAppStore;
}

declare global {
  interface Window {
    __INITIAL__STATE__: IStores;
  }
}
