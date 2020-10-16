import session from 'koa-session'

declare module 'koa-router' {
  export interface IRouterParamContext<StateT = any, CustomT = {}> {
    session: session.Session | null;
    readonly sessionOptions: session.opts | undefined;
  }
}
