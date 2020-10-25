import qs from 'qs'
import axios from 'axios'
import Koa from 'koa'
import queryString from 'query-string'
import {
  serverConfig
} from '../../config/github-config'

const handleLogin = async (ctx: Koa.Context) => {
  const user = ctx.session!.user || {}
  console.log('user', user);
  if (user.name) {
    return ctx.body = {
      data: user,
      errno: 0
    }
  }
  const {
    code
  } = ctx.request.body
  console.log('code', code);
  if (!code) {
    return ctx.body = {
      message: 'code is required',
      errno: 4004
    }
  }
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

  // @ts-ignore
  ctx.session = {
    user: resp.data
  }

  ctx.body = {
    data: resp.data,
    errno: 0
  }
}

export default handleLogin;
