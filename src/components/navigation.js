import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
  navigation: { 
  	position: 'fixed',
  	left: 0,
  	right: 0,
  	width: '100%',
	top: "auto", 
	bottom: 0,
	zIndex: 1300,
  	height: 'auto', 
	// [theme.breakpoints.up('xs')]: {
	//   	top: "auto", 
	//   	bottom: 0,	  	
 //  		height: 'auto',	
	// },  	
	// [theme.breakpoints.up('sm')]: {
	//   	top: 0,	  	
 //  		height: '55px',	
	// },  	
  },
  content:{
  	background: theme.palette.secondary.background
  },
  button: {
  	color: '#fff'
  },
}));

function Navigation() {
  	const classes = useStyles();
  	const [value, setValue] = React.useState('recents');

  	const handleChange = (event, newValue) => {
    	setValue(newValue);
  	};


	return (
	
		<div className={classes.navigation}>
			<BottomNavigation value={value} onChange={handleChange} className={classes.content}>
				<Link to="/account">
						<BottomNavigationAction className={classes.button} label="Favorites" value="favorites" icon={<GroupIcon />} />
				</Link>
				<Link to="/" className={classes.button}>
						<BottomNavigationAction className={classes.button} label="Recents" value="recents" icon={<HomeIcon />} />
				</Link>
				<Link to="/account">
						<BottomNavigationAction className={classes.button} label="Favorites" value="favorites" icon={<AccountCircleIcon />} />
				</Link>
			</BottomNavigation>		
		</div>
  	);
}

export default Navigation;
