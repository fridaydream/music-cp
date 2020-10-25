import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Link } from 'react-router-dom'
import Routes from '@/config/router'

const App = () => {
  return (
    <div>
      <Link to="/home">
        首页
      </Link>
      <Link to="/user/info">
        用户页
      </Link>
      <Link to="/play">
        播放页
      </Link>
      <Routes />
    </div>
  )
}

export default hot(App)
