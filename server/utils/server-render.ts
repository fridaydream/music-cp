
import Koa from 'koa'
import ReactDomServer from 'react-dom/server'
import ejs from 'ejs'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'
import { createGenerateClassName } from '@material-ui/core/styles';
import { create, SheetsRegistry } from 'jss';
import jssPreset from 'jss-preset-default';

import { IStores, RouterContext } from '../types';

const getStoreState = (stores: IStores) => {
  return (Object.keys(stores) as Array<keyof typeof stores>).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {} as ({[key in keyof typeof stores]: any}))
}

export default async (ctx: Koa.Context, next: () => void) => {
  // @ts-ignore
  console.log('server render in ===', ctx.session.user);
  const serverBundle = ctx.serverBundle;
  const template = ctx.template;
  const createStoreMap = serverBundle.createStoreMap
  const stores: IStores = createStoreMap()

  const user = ctx.session?.user
  if (user) {
    stores.appStore.user.info = user
    stores.appStore.user.isLogin = true
  }
  stores.themeStore.theme = 'dark'
  const createApp = serverBundle.default
  const routerContext: RouterContext = {}
  const sheetsManager = new Map();
  const sheetsRegistry = new SheetsRegistry();
  const jss = create({
    ...jssPreset(),
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    // insertionPoint: 'jss-insertion-point',
  });
  const generateClassName = createGenerateClassName();
  ctx.stores = stores;
  const app = await createApp(stores, sheetsRegistry, sheetsManager, jss, generateClassName, routerContext, ctx)
  const content = ReactDomServer.renderToString(app)
  if (routerContext.url) {
    ctx.redirect(routerContext.url);
    return;
  }
  const helmet = Helmet.rewind()
  const state = getStoreState(stores)
  const html = ejs.render(template, {
    appString: content,
    initialState: serialize(state),
    ssrPath: serialize(ctx.path),
    meta: helmet.meta.toString(),
    title: helmet.title.toString(),
    style: helmet.style.toString(),
    link: helmet.link.toString(),
    materialCss: sheetsRegistry.toString()
  })
  ctx.body = html;
  await next();
}
