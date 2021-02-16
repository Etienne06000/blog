import React, { useState, useEffect, useContext } from 'react';
import { axios } from '../constants/API';
import { AuthContext } from '../contexts/AuthProvider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2px',
    // marginTop: '25px',
    // marginBottom: '25px'
  },
}));

function Home() {
  const classes = useStyles();
  const [msg, setMsg] = useState('');
  const { isTokenExpired, getTokenExpireAt } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    axios.get('/')
      .then(res => {
        if (mounted) {
          setMsg(res.data.message)
        }
      })
    return () => (mounted = false);
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div className="App">
            <p>{msg}</p>
          </div>
        </Paper>
      </Grid>     
    </Grid>
  );
}

export default Home;


