import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Routes from "./Routes";
import RouteProvider from "./contexts/RouteProvider";
import AuthProvider from "./contexts/AuthProvider";
import "./constants/API";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouteProvider>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Routes />
          </SnackbarProvider>
        </ RouteProvider>
      </ AuthProvider>
    </div>
  );
}

export default App;
