import { observable, action, toJS } from 'mobx'

import { get } from '@/utils/http'

import {
  IMusicStore,
  MusicList,
  Music
} from '../types'

export default class MusicStore implements IMusicStore{
  'constructor'({ music }: { music: Music}  = {music: {
    list: [] as MusicList,
    playingId: ''
  }}) {
    this.music = music
  }

  @observable music: Music

  @action getMusic() {
    return new Promise((resolve, reject) => {
      get('/music/info', {}).then((resp) => {
        console.log('resp', resp);
        this.music.list = resp as MusicList
        resolve()
      }).catch(reject)
    })
  }

  @action setMusicPlayingId(id: string) {
    this.music.playingId = id
  }

  toJson() {
    return {
      music: toJS(this.music)
    }
  }
}
