import Koa from 'koa'

const handleUserInfo = async (ctx: Koa.Context, next: () => void) => {
  // @ts-ignore
  const user = ctx.session.user || {}
  if (user.name) {
    return ctx.body = {
      data: user,
      errno: 0
    }
  }
  ctx.body = {
    data: null,
    errno: 0
  }

  console.log('handle in');
  await next();
}

export default handleUserInfo;
