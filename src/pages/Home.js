import React, {useState, useEffect, useContext} from 'react';
import { axios } from '../constants/API';
import { AuthContext } from '../contexts/AuthProvider';

function Home() {
	const [msg, setMsg] = useState('');
  //const { headers, baseURL } = useContext(ApiContext);
  const { isTokenExpired, getTokenExpireAt } = useContext(AuthContext);
  useEffect(() => {
  // console.log('isTokenExpired')
  // console.log(getTokenExpireAt)
  //   if (Date.now() <= getTokenExpireAt * 1000) {
  //     console.log(true, 'token is not expired')
  //   } else { 
  //     console.log(false, 'token is expired') 
  //   }  

   axios.get('/')
      .then(res => {
        setMsg(res.data.message)
      })
  })

  return (
    <div className="App">
      <p>{msg}</p>

    </div>
  );
}

export default Home;
