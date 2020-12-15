import React, { useContext, useState } from 'react';
//import decode from 'jwt-decode';
//import Cookies from 'universal-cookie';

export const AuthContext = React.createContext({});

//const cookies = new Cookies();

export default function AuthProvider(props) {
  //const getToken = localStorage.getItem('token');

  //const getTokenExpireAt = localStorage.getItem('expire_at');

  //const isTokenExpired = getTokenExpireAt < Date.now() / 1000;

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   !!getToken && !isTokenExpired
  // );

  // const login = response => {
  //   if (response.status === 200 && response.data.token) {
  //     const token = response.data.token;
  //     const decode_token = decode(token);
  //     const expire_at = decode_token.exp;

  //     const date_expiration = new Date(0);
  //     date_expiration.setUTCSeconds(expire_at);

  //     let secure = true;

  //     if (process.env.REACT_APP_ENV === 'dev') {
  //       secure = false;
  //     }

  //     cookies.set('BEARER', token, {
  //       expires: date_expiration,
  //       secure: secure,
  //       httpOnly: true,
  //       sameSite: true
  //     });

  //     localStorage.setItem('login', decode_token.login);
  //     localStorage.setItem('uuid', decode_token.uu_id);
  //     localStorage.setItem('roles', decode_token.roles);
  //     localStorage.setItem('image', decode_token.image);

  //     localStorage.setItem('token', 'true');
  //     localStorage.setItem('expire_at', expire_at);

  //     setIsAuthenticated(true);

  //     const newSocket = io(process.env.REACT_APP_IP_NODE, {
  //       transports: ['websocket', 'polling'],
  //       reconnection: false,
  //       forceNew: true
  //     });
  //     setSocket(newSocket);
  //   } else {
  //     socket.disconnect();
  //     setIsAuthenticated(false);
  //   }
  // };

  // const logout = callback => {
  //   socket.disconnect();

  //   cookies.remove('BEARER');
  //   localStorage.removeItem('login');
  //   localStorage.removeItem('uuid');
  //   localStorage.removeItem('roles');
  //   localStorage.removeItem('image');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expire_at');
  //   setIsAuthenticated(false);

  //   document.location.reload();
  // };

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
    onAPIResponseError
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
}
