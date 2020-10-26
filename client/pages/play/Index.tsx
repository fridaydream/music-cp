import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { useAudioPlayer } from "react-use-audio-player"

import { observer } from 'mobx-react-lite'

import {
  requestInitialData
} from '@/utils/initialdata'

import {
  useStores,
} from '@/store/use-stores'

import {
  InitialStoresProps
} from '@/store/types'

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

const Play = () => {
  const classes = useStyles();
  const stores= useStores()
  const { musicStore } = stores;
  const { music } = musicStore;
  console.log('music', music.list.length);

  requestInitialData({
    stores,
  }, Play)
  const musicLength = music.list.length

  console.log('music.playingId', music.playingId);
  let musicIndex = 0
  if (music.playingId) {
    musicIndex = music.list.findIndex(li => li.id === music.playingId)
    musicIndex === -1 ? musicIndex = 0 : null
  }
  const playingMusic = music.list[musicIndex] || {}
  console.log('playingMusic', playingMusic.url);
  // let playing, pause, play
  const { playing, pause, play } = useAudioPlayer({
    src: playingMusic.url
  })
  if (musicLength === 0) {
    return <>
      do not search music
    </>
  }
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
    <Container maxWidth="sm">
      <Card className={classes.root} variant="outlined">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {playingMusic.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {playingMusic.author}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
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
        </div>
        <CardMedia
          className={classes.cover}
          image="//cdn.yonyoucloud.com/cp-music/cover/uisdc-jl.jpg"
          title="Live from space album cover"
        />
      </Card>
    </Container>
  )
}

Play.getInitialProps = async ({ stores }: InitialStoresProps) => {
  await stores.musicStore.getMusic()
}

export default observer(Play)
