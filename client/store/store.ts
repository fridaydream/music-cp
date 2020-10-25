import React from 'react'
import CounterStore from './models/counter-store'
import ThemeStore from './models/theme-store'
import AppStore from './models/app-store'
import MusicStore from './models/music-store'

export {
  CounterStore,
  ThemeStore,
  AppStore,
  MusicStore,
}

export const stores = {
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
  appStore: new AppStore(),
  musicStore: new MusicStore(),
}

export const storesContext = React.createContext(stores)

export const createStoreMap = () => (stores)
