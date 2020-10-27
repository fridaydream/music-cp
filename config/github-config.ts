// config.js
// 请填写你申请的 OAuth App 的真实内容
const clientConfig = {
  oauth_uri: 'https://github.com/login/oauth/authorize',
  redirect_uri: 'http://music.daxierhao.com/user/login',
  client_id: '6690ff445efc453e1be7',
  client_secret: 'fae6119622b9144b1653f2f75b161807e0351674',
};

// 本地开发环境下
if (process.env.NODE_ENV === 'development') {
  clientConfig.redirect_uri = 'http://localhost:3333/user/login'
  clientConfig.client_id = '6657fba62edf2e94c865'
  clientConfig.client_secret = '3b10fa4d62f7d8ed395de4c4b1a54a72ccb4f59d'
}

const serverConfig = {
  oauth_uri: 'https://github.com/login/oauth/authorize',
  access_token_url: 'https://github.com/login/oauth/access_token',
  // 获取 github 用户信息 url // eg: https://api.github.com/user?access_token=******&scope=&token_type=bearer
  user_url: 'https://api.github.com/user',

  // 生产环境
  redirect_uri: 'http://music.daxierhao.com/user/login',
  client_id: '6690ff445efc453e1be7',
  client_secret: 'fae6119622b9144b1653f2f75b161807e0351674',
};

// 本地开发环境下
if (process.env.NODE_ENV === 'development') {
  serverConfig.redirect_uri = 'http://localhost:3333/user/login'
  serverConfig.client_id = '6657fba62edf2e94c865'
  serverConfig.client_secret = '3b10fa4d62f7d8ed395de4c4b1a54a72ccb4f59d'
}

export {
  clientConfig,
  serverConfig
};
