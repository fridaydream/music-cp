import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
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


const Info = () => {
  const stores = useStores()
  const { appStore: { user } } = stores
  requestInitialData({
    stores
  }, Info)
  if (!user.isLogin) {
    return <>
      <br />
      not login
      <br />
      <Link to="/user/login">go to login</Link>
    </>;
  }
  return (
    <>
      <Avatar alt="avator" src={user.info.avatar_url} />
      {user.info.name}
    </>
  )
}

Info.getInitialProps = async ({ stores }: InitialStoresProps) => {
  await stores.appStore.getUserInfo()
}

export default observer(Info)
