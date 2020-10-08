import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import send from 'koa-send'
// import favicon from 'koa-favicon'
import serverRender from './utils/server-render'

const isDev = process.env.NODE_ENV === 'development'

const app = new Koa();

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

app.listen(3333, () => {
  console.log('server is listening in 3333')
})
