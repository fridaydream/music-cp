import React from 'react'
import CounterStore from './models/counter-store'
import ThemeStore from './models/theme-store'
import AppStore from './models/app-store'

export {
  CounterStore,
  ThemeStore,
  AppStore
}

export const stores = {
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
  appStore: new AppStore()
}

export const storesContext = React.createContext(stores)

export const createStoreMap = () => (stores)
