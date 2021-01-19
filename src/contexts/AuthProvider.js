import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { axios } from "../constants/API";

export const AuthContext = React.createContext({});

const cookies = new Cookies();

export default function AuthProvider(props) {
  const getToken = localStorage.getItem('token');

  const getTokenExpireAt = localStorage.getItem('expire_at');

  const isTokenExpired = Number(getTokenExpireAt) < Date.now() / 1000;

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getToken && !isTokenExpired
  );


  // useEffect(() => {
  //   if (Number(getTokenExpireAt) !== 0 && isTokenExpired) {
  //     //console.log('refresh-token');
  //     axios.post('/refresh-token')
  //     .then((response) => {
  //       login(response);
  //     })
  //     .catch(() => logout());
  //   }
  // }, []);

  axios.interceptors.response.use(
    (response) => {
      return response;
    }, (err) => {
      if (err.response.status === 403) {
        logout();
        return;
      }
      if (err.config.url !== '/login' &&
          err.config.url !== '/refresh-token' &&
          err.config.url !== '/inscriptions' 
        ) {      
        return new Promise((resolve, reject) => {
          const originalReq = err.config;
          if (err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest &&
            err.config.url !== '/login' &&
            err.config.url !== '/refresh-token' &&
            err.config.url !== '/inscriptions'
          ) {
            originalReq.retry = true;

            let res = axios
            .post('/refresh-token')
            .then((response) => {
              login(response);
              return axios(originalReq);
            })
            .catch(() => logout());

            resolve(res);
          }
          return Promise.reject(err);
        
        })
      }
          return Promise.reject(err);
    })



  //const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (response) => {
    if (response.status === 200 && response.data.token) {
      const token = response.data.token;
      const decode_token = decode(token);
      const expire_at = decode_token.exp;
      const refresh = response.data.data.refreshToken;
      const refresh_expire_at = response.data.data.refreshExpire;
      const date_expiration = new Date(0);
      const date_expiration_refresh = new Date(0);
      date_expiration.setUTCSeconds(expire_at);
      date_expiration_refresh.setUTCSeconds(refresh_expire_at);
      let secure = true;

      if (process.env.REACT_APP_ENV === 'dev') {
        secure = false;
      }

      // cookies.set('gniapiblogi', token, {
      //   expires: date_expiration,
      //   secure: secure,
      //   httpOnly: true,
      //   sameSite: true
      // });
      // cookies.set('gbr', refresh, {
      //   expires: date_expiration_refresh,
      //   secure: false,
      //   httpOnly: false,
      //   sameSite: false
      // });

      localStorage.setItem('email', decode_token.email);
      localStorage.setItem('uuid', decode_token.uuid);
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
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expire_at');
    setIsAuthenticated(false);
    cookies.remove('gniapiblogi');
    cookies.remove('gbr');
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
    getTokenExpireAt,
    isTokenExpired,
    onAPIResponseError,
    login,
    logout,
    getToken
  };

  return (
    <AuthContext.Provider value={values}>
      {props.children}
    </AuthContext.Provider>
  );
}
