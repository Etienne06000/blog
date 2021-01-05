import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  navigation: {
  	top: "auto", 
  	bottom: 0, 
  	position: 'fixed',
  	left: 0,
  	right: 0,
  	width: '100%'
  },
});

function Navigation() {
  	const classes = useStyles();
  	const [value, setValue] = React.useState('recents');

  	const handleChange = (event, newValue) => {
    	setValue(newValue);
  	};


	return (
		<Grid
		  container
		  spacing={0}
		  direction="column"
		  alignItems="center"
		  justify="center"
		>		
			<div className={classes.navigation}>
			    <BottomNavigation value={value} onChange={handleChange} >
					<Link to="/">
							<BottomNavigationAction label="Recents" value="recents" icon={<HomeIcon />} />
					</Link>
					<Link to="/account">
							<BottomNavigationAction label="Favorites" value="favorites" icon={<AccountCircleIcon />} />
					</Link>   
			    </BottomNavigation>		
			</div>
		</Grid>
  	);
}

export default Navigation;
