/**
 * Ce fichier fait parti du projet e2Time.com - Administration React
 *
 * (c) e2Time.com <support@e2time.com
 *
 * L'utilisation ce fichier est soumis à l'autorisation expresse de la
 * société e2Time.com. Toute utilisation sans l'accord d'e2Time.com
 * fera l'objet de poursuites.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useForm from '../../utils/useForm';
import DatePicker from 'react-date-picker';
import Grid from '@material-ui/core/Grid';

// Les PropsTypes du composant
Signup.propTypes = {
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
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: 0,
    width: '100%'
    // minWidth: 120,
    // [theme.breakpoints.up('xs')]: {
    //   width: '100%',
    // },    
    // [theme.breakpoints.up('sm')]: {
    //   width: '30%',
    // },      
    //width: '30%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },  
}));

/**
 * Formulaire d'authentification
 */
function Signup(props) {
  // Initialisation du Style
  const classes = useStyles();

  // Initialisation Hook useForm()
  const { values, handleChange, handleSubmit } = useForm(callback);

  const [civility, setCivility] = useState('');
  
  const country = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;

  const handleChangeCivility = (event) => {
    setCivility(event.target.value);
  };

  /**
   * Retour à la validation du formulaire
   * @return {Function} Valide ou non l'authentification
   */
  function callback() {
    values.civility = civility; 
    values.country = country; 
    values.language = language; 
    props.execute({ data: values });
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        {props.title}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>     
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Username"
          name="login"
          autoComplete="Username"
          autoFocus
          value={values.login || ''}
          onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="civility">Civility</InputLabel>
          <Select
            labelId="civility"
            id="civility"
            required
            value={civility}
            onChange={handleChangeCivility}
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="None">None</MenuItem>
          </Select>
        </FormControl>          
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="Email"
          label="Email"
          name="email"
          autoComplete="Email"
          type="email"
          value={values.email || ''}
          onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel shrink>
            Date Of Birth
          </InputLabel>        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="dateOfBirth"
            type="date"
            id="date"
            value={values.dateOfBirth}
            onChange={handleChange}
          />     
        </FormControl> 
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="plainPassword"
          label="Password"
          type="password"
          id="password"
          autoComplete="plainPassword"
          value={values.plainPassword || ''}
          onChange={handleChange}
        />     
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Password confirmation"
          type="password"
          id="passwordConfirmation"
          autoComplete="passwordConfirmation"
          value={values.passwordConfirmation || ''}
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
            Sign Up
          </Button>
          {props.loader}
        </div>
      </form>
    </>
  );
}

export default Signup;
