import Koa from 'koa'

import { musicList } from '../../config/music-config'

const handleMusic = async (ctx: Koa.Context) => {
  const user = ctx.session!.user || {}
  console.log('user', user);
  const id = ctx.query.id
  // 如果没有id，查询所有
  if (!id) {
    return ctx.body = {
      data: musicList,
      errno: 0
    }
  }
  const result = musicList.find(li => li.id === id)
  if (result) {
    return ctx.body = {
      data: result,
      errno: 0
    }
  }
  return ctx.body = {
    message: 'id is not exist',
    errno: 4004
  }
}

export default handleMusic;
