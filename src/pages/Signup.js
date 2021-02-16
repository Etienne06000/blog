import React, { useState, useContext } from 'react';
import Signup from '../components/Authentification/SignupForm';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { axios } from '../constants/API';
import { AuthContext } from '../contexts/AuthProvider';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '25px',
    width: '100%'
  },
  paper1: {
    marginTop: '25px'
  },
  paper2: {
    marginBottom: '25px'
  },
  bg: {
      background: theme.palette.secondary.background,
      minHeight: '100vh'
  },
  link: {
    textDecoration: 'none'
  }
}));

function SignupPage(props) {
  
  const classes = useStyles();

  const { login, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(); 

  function executePost(body) {
    setMsg([]);
    console.log(body.data);
    setLoading(true);
    axios.post(`/inscriptions`, body.data)
      .then(res => {
        login(res);
        window.location.reload();
      })
      .catch(
        err => {
          let parseError = [];
          let children = Object.values(err.response.data.errors.children);
          children.forEach(child => {
            if (child.errors) {
              child.errors.forEach(error => {
                parseError.push(error)
              });
            }
          });
          setMsg(parseError)   
          setLoading(false);
        }
      )         
  }

  if (isAuthenticated) {
    props.history.push('/');
  }  

  return (
    <div className={classes.bg}>
      <Container component="main" maxWidth="xs">
        <Grid container >
        <Paper className={[classes.paper,classes.paper1]}>
            <Signup
              title="Create a new account"
              execute={executePost}
              loader={
                loading && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )
              }
            />
            <div>
            {
              msg ? (
                msg.map(e => (
                  <div>{e}</div>
                ))
              ) : ''
            }
            </div>
        </Paper>
        <Paper className={[classes.paper,classes.paper2]}>
          <span>
            Have an account? 
            <Link to="/login" className={classes.link}>
             <span> Log in</span>
            </Link>
          </span>
        </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default SignupPage;
