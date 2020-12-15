import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Routes from "./Routes";
import RouteProvider from "./contexts/RouteProvider";
import AuthProvider from "./contexts/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouteProvider>
          <Routes />
        </ RouteProvider>
      </ AuthProvider>
    </div>
  );
}

export default App;
