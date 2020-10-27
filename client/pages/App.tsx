import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Link, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useAudioPosition } from "react-use-audio-player"
import LinearProgress from '@material-ui/core/LinearProgress';

import AudioController from '@/components/AudioController'

import Routes from '@/config/router'
import { formatTime } from '@/utils/time-format'

import {
  useStores,
} from '@/store/use-stores'

const App = () => {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      height: 90,
      position: 'fixed',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    slider: {
      width: 300,
      paddingTop: 30
    },
    progress: {
      marginTop: 8,
      height: 4,
    }
  });

  const { duration, position, seek, percentComplete } = useAudioPosition({ highRefreshRate: true })

  const elapsed = typeof position === 'number' ? position : 0
  const location = useLocation();
  const classes = useStyles();
  const stores= useStores()
  const { musicStore: { music: { list }} } = stores;
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
      <CssBaseline />
      {
        location.pathname !== '/play' && list.length > 0 ? (
          <Paper elevation={3} className={classes.root}>
            <Grid container spacing={2} className={classes.slider}>
              <Grid item>
                {formatTime(elapsed)}
              </Grid>
              <Grid item sm>
                {/* <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" /> */}
                <LinearProgress variant="determinate" value={percentComplete} className={classes.progress} />
              </Grid>
              <Grid item>
                {formatTime(duration)}
              </Grid>
            </Grid>
            <AudioController />
          </Paper>
        ) : null
      }
    </div>
  )
}

export default hot(App)
