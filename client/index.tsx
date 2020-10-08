import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import App from '@/pages/App'
import { storesContext, CounterStore, ThemeStore } from "@/store/store";
import { theme } from './theme'

const root = document.getElementById('root')

const initialState = window.__INITIAL__STATE__ || {}

const themeStore = new ThemeStore(initialState.themeStore)
const counterStore = new CounterStore()

const createApp = (TheApp: React.ComponentType) => {
  const Main = () => {
    React.useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement!.removeChild(jssStyles);
      }
    }, []);
    return <TheApp />
  }
  return Main
}

const render = (Component: React.ComponentType) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <storesContext.Provider
      value={{
        themeStore,
        counterStore
      }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </BrowserRouter>
    </storesContext.Provider>,
    root,
  )
}

render(createApp(App))
