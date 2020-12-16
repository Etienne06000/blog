/**
 * Ce fichier fait parti du projet e2Time.com - Administration React
 *
 * (c) e2Time.com <support@e2time.com
 *
 * L'utilisation ce fichier est soumis à l'autorisation expresse de la
 * société e2Time.com. Toute utilisation sans l'accord d'e2Time.com
 * fera l'objet de poursuites.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../utils/useForm';

// Les PropsTypes du composant
Login.propTypes = {
  title: PropTypes.string,
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  execute: PropTypes.func
};

/**
 * Style du formulaire d'authentification
 *
 * @param  {Object} theme Thème Material UI
 * @return {Object}       Hook API pour générer le style
 */
const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

/**
 * Formulaire d'authentification
 */
function Login(props) {
  // Initialisation du Style
  const classes = useStyles();

  // Initialisation Hook useForm()
  const { values, handleChange, handleSubmit } = useForm(callback);

  /**
   * Retour à la validation du formulaire
   * @return {Function} Valide ou non l'authentification
   */
  function callback() {
    props.execute({ data: values });
  }

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="Email"
          label="Email"
          name="username"
          autoComplete="Email"
          autoFocus
          value={values.username || ''}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={values.password || ''}
          onChange={handleChange}
        />
        <div className={classes.wrapper}>
          <Button
            type="submit"
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            disabled={!!props.loader}
          >
            Connexion
          </Button>
          {props.loader}
        </div>
      </form>
    </>
  );
}

export default Login;
