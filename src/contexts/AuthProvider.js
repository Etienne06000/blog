import React, { useState } from 'react';
import decode from 'jwt-decode';
import Cookies from 'universal-cookie';

export const AuthContext = React.createContext({});

const cookies = new Cookies();

export default function AuthProvider(props) {
  const getToken = localStorage.getItem('token');

  const getTokenExpireAt = localStorage.getItem('expire_at');

  const isTokenExpired = getTokenExpireAt < Date.now() / 1000;


  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getToken && !isTokenExpired
  );

  //const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = response => {
    if (response.status === 200 && response.data.token) {
      const token = response.data.token;
      const decode_token = decode(token);
      const expire_at = decode_token.exp;
      const refresh = response.data.refresh;

      const date_expiration = new Date(0);
      date_expiration.setUTCSeconds(expire_at);

      let secure = true;

      if (process.env.REACT_APP_ENV === 'dev') {
        secure = false;
      }

      cookies.set('gniapiblogi', token, {
        expires: date_expiration,
        secure: secure,
        httpOnly: true,
        sameSite: true
      });

      cookies.set('gbr', refresh, {
        expires: date_expiration,
        secure: secure,
        httpOnly: true,
        sameSite: true
      });

      localStorage.setItem('email', decode_token.login);
      localStorage.setItem('uuid', decode_token.uu_id);

      localStorage.setItem('token', 'true');
      localStorage.setItem('expire_at', expire_at);

      setIsAuthenticated(true);

    } else {
      setIsAuthenticated(false);
    }
  };

  const logout = callback => {

    cookies.remove('gniapiblogi');
    cookies.remove('gbr');
    localStorage.removeItem('uuid');
    localStorage.removeItem('token');
    localStorage.removeItem('expire_at');
    setIsAuthenticated(false);

    document.location.reload();
  };

  // const getRoles = () => {
  //   return localStorage.getItem('roles')
  //     ? localStorage.getItem('roles').split(',')
  //     : ['ROLE_UTILISATEUR'];
  // };


  const onAPIResponseError = statusCode => {
    let displayError = true;

    if (statusCode === 403 || statusCode === 401) {
      displayError = false;
      //logout();
    }

    return displayError;
  };

  const values = {
    isAuthenticated,
    onAPIResponseError,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
}
