import React, {useContext, useEffect} from "react";
import axios from "axios";
import { AuthContext } from '../contexts/AuthProvider';

export const ApiContext = React.createContext({});

export default function ApiProvider(props) {

  	const { 
  		login, 
  		isTokenExpired, 
  		getTokenExpireAt 
  	} = useContext(AuthContext);

	const headers = {
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
		},
		data: {},
		json: true
	};

	const baseURL = process.env.REACT_APP_BASE_URL;
	//let pre;
	// go useEffect
	useEffect(() => {

		axios.interceptors.response.use((response) => response, (error) => {
		  // whatever you want to do with the error
		  let method = error.response.config.method;
		  let url = error.response.config.url;
		  let data = error.response.config.data;
		  const code = error.response.data.code;
		  console.log(code);
		  console.log(error);
		  console.log(data);
		  console.log(url);

		  console.log(error.response.data);
		  if (code == 401) {
		    axios.post(baseURL + `/refresh-token`, null, headers)
		      .then(res => {
		        console.log('succes');
		        console.log('res');
		        console.log(res);
		      	login(res)
		        return axios.request(error.config);
		        //axios.method(url, data, headers)
		      })
		      .catch(
		        err => {
		          console.log('ntm');
		          console.log(err);
		          console.log(err.response);
		          return Promise.reject(error);

		        }
		      ) 
		  }
		  return error.response;
		})
	})

// #Test06!@
	const values = {
		headers,
		baseURL
	}

	return (
		<ApiContext.Provider value={values}>
				{props.children}
		</ApiContext.Provider>
	);	
};