import React from 'react'
import Button from '@material-ui/core/Button'
import queryString from 'query-string'

import { Redirect } from 'react-router-dom'
import {
  useStores,
} from '@/store/use-stores'
import {
  InitialStoresProps
} from '@/store/types'

import {
  QueryProps,
  requestInitialData
} from '@/utils/initialdata'

import {
  clientConfig
} from '../../../config/github-config'

const Login = () => {
  const stores = useStores()
  const gotoLogin = () => {
    window.location.href = `${clientConfig.oauth_uri}?client_id=${clientConfig.client_id}&redirect_uri=${clientConfig.redirect_uri}`
  }
  let code = ''
  if (typeof window !== 'undefined') {
    code = queryString.parse(window.location.search).code as string
  }
  requestInitialData({
    stores,
    query: {
      code
    }
  }, Login)
  const { appStore } = stores
  if (appStore.user.isLogin) {
    return <Redirect to={'/user/info'} />
  }
  return (
    <Button variant="contained" color="primary" onClick={gotoLogin}>github login</Button>
  )
}

Login.getInitialProps = async ({ stores, query }: InitialStoresProps & QueryProps) => {
  const code = query?.code
  await stores.appStore.login(code)
}

export default Login
