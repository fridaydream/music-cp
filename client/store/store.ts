import React from 'react'
import CounterStore from './models/counter-store'
import ThemeStore from './models/theme-store'

export {
  CounterStore,
  ThemeStore
}

export const stores = {
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
}

export const storesContext = React.createContext(stores)

export const createStoreMap = () => (stores)
