import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Routes from "./Routes";
import RouteProvider from "./contexts/RouteProvider";
import AuthProvider from "./contexts/AuthProvider";
import "./constants/API";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import Theme from "./assets/themes/Theme";
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<CssBaseline />
				<AuthProvider>
				        <RouteProvider>
				          <Routes />
				        </RouteProvider>
				</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
