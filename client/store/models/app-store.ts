import { observable, action, toJS } from 'mobx'

import { post } from '@/util/http'

import {
  IAppStore
} from '../types'

export default class AppStore implements IAppStore{
  @observable user = {
    isLogin: false,
    info: {},
  }

  init(user = {}) {
    this.user.info = user
  }

  @action login(code = '') {
    console.log('code===', code)
    return new Promise((resolve, reject) => {
      post('/user/login', {}, {
        code
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then((resp: any) => {
        console.log('resp', resp);
        this.user.info = resp.data;
        this.user.isLogin = true
        resolve()
      }).catch(reject)
    })
  }

  toJson() {
    return {
      user: toJS(this.user)
    }
  }
}
