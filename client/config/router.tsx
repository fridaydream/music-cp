import React from 'react'

import { Route, Redirect, matchPath } from 'react-router-dom'
import { FC, RouteItem } from './types'

import Home from '@/pages/home/Index'
import User from '@/pages/user/Index'

export default () => (
  <>
    <Route path="/" exact render={() => <Redirect to="/home" />} />
    <Route path="/home" exact component={Home} />
    <Route path="/user" component={User} />
  </>
)

export const routes = [
  {
    path: '/home',
    exact: true,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Component: () => (require('../pages/home/Index').default), // 这里使用一个function包裹为了让它延迟require
    // controller: 'page',
    // handler: 'index'
  },
  {
    path: '/user',
    exact: true,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Component: () => (require('../pages/user/Index').default),
    // controller: 'page',
    // handler: 'index'
  }
]

const NotFound: FC = () => {
  return (
    <div>路由查询404</div>
  )
}

export const getComponent = (Routes: RouteItem[], path: string) => {
  // 根据请求的path来匹配到对应的component
  const activeRoute = Routes.find(route => matchPath(path, route)) || { Component: () => NotFound } // 找不到对应的组件时返回NotFound组件
  const activeComponent = activeRoute.Component
  return activeComponent
}
