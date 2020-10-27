import Koa, { DefaultState, Context } from 'koa'
import fs from 'fs'
import path from 'path'
import send from 'koa-send'
import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import Router from '@koa/router'
import handleLogin from './utils/handle-login'
import handleMusic from './utils/handle-music'

// import favicon from 'koa-favicon'
import serverRender from './utils/server-render'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

const router = new Router<DefaultState, Context>({
  prefix: '/api'
});

router.post('/user/login', handleLogin)
router.get('/user/login', handleLogin)
router.get('/music/info', handleMusic)

app
  .use(router.routes())
  .use(router.allowedMethods());

// app.use(favicon('http://www.baidu.com/favicon.ico'));

if (!isDev) {
  // 开发的时候用import需要放在最外面(这个文件可能没有)
  const serverEntry = require('../dist/server-entry')
  let template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')
  app.use(async (ctx, next) => {
    ctx.template = template;
    ctx.serverBundle = serverEntry;
    await next()
  });
  app.use(serverRender);
  app.use(async (ctx, next) => {
    if ((ctx.method === 'HEAD' || ctx.method === 'GET') && ctx.path.indexOf('/public/') === 0) {
      ctx.path = ctx.path.slice('/public/'.length);
      console.log('ctx.path', ctx.path);
      await send(ctx, ctx.path, {
        index: 'index.html',
        root: path.join(__dirname, '../dist')
      })
    }
    await next()
  })
} else {
  const devStatic = require('./utils/dev-static').default
  devStatic(app)
}

app.listen(80, () => {
  console.log('server is listening in 3333')
})
