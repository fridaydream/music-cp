import React from 'react'
// import { observer } from 'mobx-react-lite'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import {
  useStores,
} from '@/store/use-stores'
import {
  clientConfig
} from '../../../config/github-config'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const Home = () => {
  const { themeStore } = useStores()
  const classes = useStyles();
  const gotoLogin = () => {
    window.location.href = `${clientConfig.oauth_uri}?client_id=${clientConfig.client_id}&redirect_uri=${clientConfig.redirect_uri}`
  }
  return (
    <>
      <Helmet>
        <title>首页</title>
      </Helmet>
      <div>{themeStore.theme}</div>
      <button onClick={() => themeStore.setTheme('light')}>
        set theme: light
      </button>
      <button onClick={() => themeStore.setTheme('dark')}>
        set theme: dark
      </button>
      <ul>
        {
          themeStore.news.map((item) => (
            <li key={item.id}>
              {item.title}
            </li>
            )
          )
        }
      </ul>
      <Button className={classes.root} onClick={gotoLogin}>github login</Button>
    </>
  )
}

interface Stores {
  themeStore: {
    getData: () => void
  }
}

interface HomeProps {
  stores: Stores;
}

Home.getInitialProps = async ({ stores }: HomeProps) => {
  return stores.themeStore.getData()
}

export default Home
