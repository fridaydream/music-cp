
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
  id: number;
  avatar_url: string;
  url: string;
  name: string;
}

export interface User {
  isLogin: boolean;
  info: Info;
}

export interface IAppStore {
  user: User
  login: (code?: string) => Promise<unknown>;
  getUserInfo: () => Promise<unknown>;
  toJson(): { user: User };
  init(arg0: User): void;
}

export interface MusicListItem {
  id: string;
  title: string;
  author: string;
  url: string;
}

export type MusicList = MusicListItem[]

export interface Music {
  list: MusicList;
  playingId: string;
}

export interface IMusicStore {
  music: Music;
  getMusic: () => Promise<unknown>;
  setMusicPlayingId: (id: string) => void;
  toJson(): { music: Music };
}

export interface IStores {
  counterStore: ICounterStore;
  themeStore: IThemeStore;
  appStore: IAppStore;
  musicStore: IMusicStore;
}

export interface InitialStoresProps {
  stores: IStores
}


declare global {
  interface Window {
    __INITIAL__STATE__: IStores;
    __SSRPATH__: string;
  }
}
