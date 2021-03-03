import Koa, { DefaultState, Context } from 'koa'
import fs from 'fs'
import path from 'path'
import send from 'koa-send'
import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import koaBody from 'koa-body'
import Router from '@koa/router'
import handleLogin from './utils/handle-login'
import handleUserInfo from './utils/handle-user-info'
import handleMusic from './utils/handle-music'
import handleExcel from './utils/handle-excel'

import devStatic from './utils/dev-static'

// import favicon from 'koa-favicon'
import serverRender from './utils/server-render'

// const isDev = process.env.NODE_ENV !== 'production'

const app = new Koa();

app.use(bodyparser())

app.keys = ['some secret hurr'];

var CONFIG = {
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

const option = {
  multipart: true,
  formidable: {
    maxFileSize: 2000 * 1024 * 1024 //最大2G
  }
};

app.use(koaBody(option));

const router = new Router<DefaultState, Context>({
  prefix: '/api'
});

router.post('/user/login', handleLogin)
router.get('/user/info', handleUserInfo)
router.get('/music/info', handleMusic)
router.get('/update/excel', handleExcel)

app
  .use(router.routes())
  .use(router.allowedMethods());

// app.use(favicon('http://www.baidu.com/favicon.ico'));

// if (!isDev) {
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
    console.log('ctx.path', ctx.path)
    if (ctx.path.indexOf('/public/') === 0) {
      ctx.path = ctx.path.slice('/public/'.length);
      await send(ctx, ctx.path, {
        index: 'index.html',
        root: path.join(__dirname, '../dist')
      })
    }
    await next()
  })
// } else {
//   devStatic(app)
// }

app.listen(3333, () => {
  console.log('server is listening in 3333')
})

module.exports = app.callback()
