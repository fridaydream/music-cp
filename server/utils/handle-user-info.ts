import Koa from 'koa'

const handleUserInfo = async (ctx: Koa.Context, next: () => void) => {
  const user = ctx.session?.user || {}
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
  // @ts-ignore
  ctx.session = {
    logged: '1111'
  }
  console.log('handle in');
  await next();
}

export default handleUserInfo;
