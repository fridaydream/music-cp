import React from 'react'
import Button from '@material-ui/core/Button';
import {
  clientConfig
} from '../../../config/github-config'

import {
  IStores
} from '@/store/types'

const Login = () => {
  const gotoLogin = () => {
    window.location.href = `${clientConfig.oauth_uri}?client_id=${clientConfig.client_id}&redirect_uri=${clientConfig.redirect_uri}`
  }

  return (
    <Button variant="contained" color="primary" onClick={gotoLogin}>github login</Button>
  )
}

interface LoginProps {
  stores: IStores;
  query: {
    code: string;
  };
}

Login.getInitialProps = async ({ stores, query }: LoginProps) => {
  const {
    code
  } = query
  await stores.appStore.login(code)
}

export default Login
