import Axios from 'axios';
//import { configure } from 'axios-hooks';

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
  crossdomain: true,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': true
  }
});

axios.defaults.withCredentials = 'include';

//configure({ axios });
