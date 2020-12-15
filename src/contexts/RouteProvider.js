import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Home from '../pages/Home.js';
import Account from '../pages/Account.js';

export const RouteContext = React.createContext({});

export default function RouteProvider(props) {
	const routes = [
		{
		  id: "home",
		  icon: <HomeIcon />,
		  path: "/",
		  name: "home",
		  Component: Home
		},
		{
		  id: "account",
		  icon: <AccountCircleIcon />,
		  path: "/account",
		  name: "account",
		  Component: Account
		}
	]

	const values = {
		routes
	};

	return (
		<RouteContext.Provider value={values}>
	  		{props.children}
		</RouteContext.Provider>
	);	
};