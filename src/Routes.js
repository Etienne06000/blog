import React, { useContext } from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthProvider";
import { RouteContext } from "./contexts/RouteProvider";
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Error404 from './pages/Error404.js'
import DashboardPageTemplate from "./pages/DashboardPageTemplate";

function Routes(props) {
	const { isAuthenticated, isRouteAuthorized } = useContext(AuthContext);
	const { routes } = useContext(RouteContext);
	return (
	    <Router>
	      <Switch>
	        {/* full pages routes */}

	        <Route exact={true} path="/login" component={Login} />

	        <Route exact={true} path="/signup" component={Signup} />

	        {/*  dashboard routes */}

	        {routes.map(({ path, name, icon, Component }, key) => {
	          return (
	            <Route
	              key={key}
	              exact
	              path={path}
	              render={(routeRenderingProps) => {
	                return isAuthenticated ? (
	                    <DashboardPageTemplate
	                      path={path}
	                      Component={Component}
	                      icon={icon}
	                      name={name}
	                      routeRenderingProps={routeRenderingProps}
	                    />
	                  ) : (
	                  <Redirect
	                    to={{
	                      pathname: "/login",
	                      state: { from: props.location },
	                    }}
	                  />
	                )
	              }}
	            ></Route>
	          )
	        })}

	        {/*  not found route */}

	        <Route component={Error404} />
	      </Switch>
	    </Router>
  );
}

export default Routes;