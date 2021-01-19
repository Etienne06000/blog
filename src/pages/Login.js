import React, { useContext, useState } from 'react';
import { axios } from '../constants/API';
import { withRouter } from 'react-router-dom';
import Login from '../components/Authentification/LoginForm';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// Configuration du style
const useStyles = makeStyles(theme => ({
  // '@global': {
  //   html: {
  //     height: '100vh'
  //   },
  //   body: {
  //     background:
  //       'linear-gradient(to right bottom, ' +
  //       theme.palette.primary.main +
  //       ', ' +
  //       theme.palette.secondary.main +
  //       ')'
  //   }
  // },
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

  // Initialisation Hook useAuth()
  const { login, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function executePost(body) {
    setLoading(true);
    axios.post(`/login`, body.data)
      .then(res => {
        login(res);
        window.location.reload();
      })
      .catch(
        err => {
          setError(err.response.data.message.message);
          setLoading(false);
        }
      )    
  }

  if (isAuthenticated) {
    props.history.push('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      <header className={classes.header}>
      </header>
      <Paper className={classes.paper}>
        <div>
        <Link to="/signup" className={classes.link}>
          <Button variant="outlined" color="secondary" className={classes.link}>
            S'inscrire
          </Button>
        </Link>        
        </div>      
        <Login
          title="Connexion"
          execute={executePost}
          loader={
            loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )
          }
        />
        <div>
          {error}
        </ div>
      </Paper>
    </Container>
  );
}
export default withRouter(LoginPage);
