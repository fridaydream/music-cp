import { useContext } from 'react'

import {
  storesContext
} from './store'

// store数据
export const useStores = () => {
  const store = useContext(storesContext)
  return store;
}
