import { observable, action, toJS } from 'mobx'

import { post } from '@/utils/http'

import {
  IAppStore,
  Info,
  User
} from '../types'

const initInfo = {
  id: 0,
  avatar_url: '',
  url: '',
  name: '',
}

export default class AppStore implements IAppStore{
  @observable user = {
    isLogin: false,
    info: initInfo,
  }

  init(user: User) {
    if (user) {
      this.user = user
    }
  }

  @action login(code = '') {
    console.log('code===', code)
    return new Promise((resolve, reject) => {
      post('/user/login', {}, {
        code
      }).then((resp) => {
        if (resp) {
          this.user.info = resp as Info;
          this.user.isLogin = true
        }
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
