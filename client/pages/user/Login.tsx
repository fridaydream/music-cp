import React from 'react'
import Button from '@material-ui/core/Button'
import queryString from 'query-string'
import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react-lite'

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
  // requestInitialData({
  //   stores,
  //   query: {
  //     code
  //   }
  // }, Login)
  const { appStore: { user } } = stores
  // if (appStore.user.isLogin) {
  //   return <Redirect to={'/user/info'} />
  // }
  return (
    <>
      {
        user.isLogin ?
          <div>
            已登陆
            <Avatar alt="avator" src={user.info.avatar_url} />
            {user.info.name}
          </div> :
          <>
            <Button variant="contained" color="primary" onClick={gotoLogin}>获取github login授权码</Button>
            <Button variant="contained" color="primary" onClick={() => stores.appStore.login(code)}>登陆</Button>
          </>
      }

    </>
  )
}

// Login.getInitialProps = async ({ stores, query }: InitialStoresProps & QueryProps) => {
//   const code = query?.code
//   console.log('query code', code);
//   await stores.appStore.login(code)
// }

export default observer(Login)
