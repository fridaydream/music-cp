import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 40,
    },
    input: {
      display: 'none',
    },
    margin: {
      marginTop: 20
    },
    play: {
      marginBottom: 20
    },
    grid: {
      marginTop: 20
    },
    img: {
      width: '100%'
    },
    tableWrap: {
      width: '80%',
      margin: '40px auto'
    },
    table: {
      minWidth: 650,
    },
    export: {
      textAlign: 'right'
    }
  }),
);
