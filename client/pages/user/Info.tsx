import React from 'react'
import Avatar from '@material-ui/core/Avatar';

import {
  useStores,
} from '@/store/use-stores'

const Info = () => {
  const { appStore: { user } } = useStores()
  console.log('user', user.isLogin);
  if (!user.isLogin) {
    return <>not login</>;
  }
  return (
    <>
      <Avatar alt="avator" src={user.info.avatar_url} />
      {user.info.name}
    </>
  )
}

export default Info
