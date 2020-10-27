import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { useAudioPlayer } from "react-use-audio-player"

import { observer } from 'mobx-react-lite'
import Helmet from 'react-helmet'

import {
  useStores,
} from '@/store/use-stores'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

const AudioController = () => {
  const classes = useStyles();
  const stores= useStores()
  const { musicStore } = stores;
  const { music } = musicStore;
  const musicLength = music.list.length

  let musicIndex = 0
  if (music.playingId) {
    musicIndex = music.list.findIndex(li => li.id === music.playingId)
    musicIndex === -1 ? musicIndex = 0 : null
  }
  const playingMusic = music.list[musicIndex] || {}
  const { playing, pause, play } = useAudioPlayer({
    src: playingMusic.url,
    autoplay: true,
    onend: () => {
      handlePlayOrder('next', musicIndex)
    }
  })

  const handlePlayOrder = (type: 'next' | 'previous', index: number) => {
    if (type === 'next') {
      index++
    } else {
      index--
    }
    if (index >= musicLength) {
      index = 0
    }
    if (index < 0) {
      index = musicLength - 1
    }
    musicStore.setMusicPlayingId(music.list[index].id)
  }
  return (
    <div className={classes.controls}>
      <Helmet>
        <title>{playingMusic.title}</title>
      </Helmet>
      <IconButton aria-label="previous" onClick={() => handlePlayOrder('previous', musicIndex)}>
        <SkipPreviousIcon />
      </IconButton>
      <IconButton aria-label="play/pause" onClick={() => (playing ? pause() : play())}>
        {
          playing ?
            <PauseIcon className={classes.playIcon} /> :
            <PlayArrowIcon className={classes.playIcon} />
        }
      </IconButton>
      <IconButton aria-label="next" onClick={() => handlePlayOrder('next', musicIndex)}>
        <SkipNextIcon />
      </IconButton>
    </div>
  )
}

export default observer(AudioController)
