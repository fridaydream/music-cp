import { observable, action } from 'mobx'
import {
  IThemeStoreProps,
  IThemeStore,
} from '../types'

const getData = async () => {
  return Promise.resolve([
    {
      id: '1',
      title: 'Racket v7.3 Release Notes'
    },
    {
      id: '2',
      title: 'Free Dropbox Accounts Now Only Sync to Three Devices'
    },
    { id: '3',
      title: 'Voynich Manuscript Decoded by Bristol Academic'
    },
    { id: '4',
      title: 'Burger King to Deliver Whoppers to LA Drivers Stuck in Traffic'
    },
    { id: '5',
      title: 'How much do YouTube celebrities charge to advertise your product? '
    }
  ])
}

export default class ThemeStore implements IThemeStore {
  'constructor'({ theme, news } : IThemeStoreProps = { theme: 'light', news: [] }) {
    this.theme = theme;
    this.news = news;
  }

  @observable theme
  @observable news

  @action
  setTheme(newTheme: string) {
    this.theme = newTheme
  }

  @action
  getData = async () => {
    const news = await getData()
    this.news = news
    return news
  }

  toJson() {
    return {
      theme: this.theme,
      news: this.news
    }
  }
}
