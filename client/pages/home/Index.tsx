import React from 'react'
// import { observer } from 'mobx-react-lite'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react-lite'

import {
  useStores,
} from '@/store/use-stores'

import {
  InitialStoresProps
} from '@/store/types'

import {
  requestInitialData
} from '@/utils/initialdata'

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
  const stores = useStores()
  const { themeStore } = stores
  const history = useHistory();
  const classes = useStyles();
  requestInitialData({
    stores,
  }, Home)
  const gotoLogin = () => {
    // window.location.href = `${clientConfig.oauth_uri}?client_id=${clientConfig.client_id}&redirect_uri=${clientConfig.redirect_uri}`
    history.push('/user/login')
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

Home.getInitialProps = async ({ stores }: InitialStoresProps) => {
  return stores.themeStore.getData()
}

export default observer(Home)
