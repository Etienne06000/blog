import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: '100vh',
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
			<div className="navigation" style={{top: "auto", bottom: 0, position: 'fixed'}}>
			    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
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
