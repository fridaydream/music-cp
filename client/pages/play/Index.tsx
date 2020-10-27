import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

import AudioController from '@/components/AudioController'
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

  requestInitialData({
    stores,
  }, Play)
  const musicLength = music.list.length

  let musicIndex = 0
  if (music.playingId) {
    musicIndex = music.list.findIndex(li => li.id === music.playingId)
    musicIndex === -1 ? musicIndex = 0 : null
  }
  const playingMusic = music.list[musicIndex] || {}

  if (musicLength === 0) {
    return <>
      do not search music
    </>
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
          <AudioController />
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
