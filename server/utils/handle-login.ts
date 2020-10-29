import axios from 'axios'
import Koa from 'koa'
import queryString from 'query-string'
import {
  serverConfig
} from '../../config/github-config'

interface User {
  name: string;
  avatar_url: string;
  email: string;
}

const handleLogin = async (ctx: Koa.Context, next: () => void) => {
  // @ts-ignore
  const user = ctx.session.user || {}
  if (user && user.name) {
    return ctx.body = {
      data: user,
      errno: 0
    }
  }
  const {
    code
  } = ctx.request.body
  console.log('code++++', code);
  if (!code) {
    console.log('no code');
    return ctx.body = {
      message: 'code is required',
      errno: 4004
    }
  }
  console.log('=======')
  const params = {
    client_id: serverConfig.client_id,
    client_secret: serverConfig.client_secret,
    code,
  };
  console.log('params', params);
  const res = await axios.post(serverConfig.access_token_url, JSON.stringify(params), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const resObj = queryString.parse(res.data)
  if (!resObj.access_token) {
    return ctx.body = {
      message: 'code is out of date',
      errno: 4000
    }
  }
  console.log('resObj', resObj);
  const resp = await axios({
    method: 'get',
    url: serverConfig.user_url,
    headers: {
      accept: 'application/json',
      Authorization: `token ${resObj.access_token}`
    }
  });
  console.log('login response', resp.data);

  const userInfo: User = {
    name: resp.data.name,
    avatar_url:  resp.data.avatar_url,
    email:  resp.data.email,
  }

  console.log('userInfo', userInfo);

  // @ts-ignore
  ctx.session = {
    user: userInfo
  }

  await next();
  ctx.body = {
    data: userInfo,
    errno: 0
  }
}

export default handleLogin;
