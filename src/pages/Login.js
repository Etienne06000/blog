import React, { useContext, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Login from '../components/Authentification/LoginForm';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../contexts/AuthProvider';

// Configuration du style
const useStyles = makeStyles(theme => ({
  '@global': {
    html: {
      height: '100vh'
    },
    body: {
      background:
        'linear-gradient(to right bottom, ' +
        theme.palette.primary.main +
        ', ' +
        theme.palette.secondary.main +
        ')'
    }
  },
  header: {
    padding: theme.spacing(8, 0),
    textAlign: 'center'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  paper: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none'
  }
}));

/**
 * Page d'authentification
 */
function LoginPage(props) {
  // Initialisation du Style
  const classes = useStyles();

  // Initialisation Snackbar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Initialisation POST API Administration E2time
  const [
    { loading: postLoading, error: postError, response: postResponse },
    executePost
  ] = useAxios(
    {
      url: '/login',
      method: 'POST'
    },
    { manual: true }
  );

  // Initialisation Hook useAuth()
  const { login, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Si on est pas encore authentifié on lance le processus d'authentification
    if (postResponse && !isAuthenticated) {
      login(postResponse);
    }
  }, [login, postResponse, isAuthenticated]);

  if (postError) {
    // Action Close sur la Snackbar
    /* istanbul ignore next */
    const action = key => (
      <IconButton
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    );

    if (postError.response) {
      const messageError = postError.response.data.message.message;

      enqueueSnackbar(messageError, {
        variant: 'error',
        action
      });
    }
  }

  if (isAuthenticated) {
    props.history.push('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <header className={classes.header}>
      </header>
      <Paper className={classes.paper}>
        <Login
          title="Connexion"
          execute={executePost}
          loader={
            postLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )
          }
        />
      </Paper>
    </Container>
  );
}
export default withRouter(LoginPage);
