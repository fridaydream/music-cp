import axios from 'axios'
import webpack from 'webpack'
import MemoryFs from 'memory-fs'
import path from 'path'
import Koa from 'koa'
import koa2proxymiddleware from 'koa2-proxy-middleware'
import bodyparser from 'koa-bodyparser'
// @ts-ignore
import serverConfig from '../../build/webpack.config.server'
import NativeModule from 'module'
import vm from 'vm'
import serverRender from './server-render'

// (function(exports, require, module, __filename, __dirname) {...bundle code})
const getModuleFromString = (bundle: string, filename: string) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
    .then(res => {
      resolve(res.data)
    })
    .catch(reject)
  })
}

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs
let serverBundle: React.FC;
serverCompiler.watch({}, (err, stats: webpack.Stats) => {
  if (err) throw err
  // @ts-ignore
  stats = stats.toJson()
  // @ts-ignore
  stats.errors.forEach((errmsg: string) => console.error(errmsg));
  // @ts-ignore
  stats.warnings.forEach((warn: string) => console.warn(warn));
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  // 下面这个m.exports.default和热更新有关联，改变了webpack public中/public =》 /public/之后需要加 default
  // @ts-ignore
  serverBundle = m.exports
})

export default function (app: Koa) {
  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  const options = {
    targets: {
      // (.*) means anything
      '/public/(.*)': {
        target: 'http://localhost:8888/',
        changeOrigin: true,
      },
    }
  }
  app.use(koa2proxymiddleware(options));
  app.use(async (ctx: Koa.Context, next) => {
    if (!serverBundle) {
      ctx.body = 'waiting for compile, refresh later'
      return
    }
    let template = await getTemplate()
    ctx.template = template;
    ctx.serverBundle = serverBundle;
    await next();
  });
  app.use(serverRender);
}
