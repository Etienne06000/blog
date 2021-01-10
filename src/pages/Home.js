import React, {useState, useEffect, useContext} from 'react';
import { axios } from '../constants/API';
import { AuthContext } from '../contexts/AuthProvider';

function Home() {
	const [msg, setMsg] = useState('');
  const { isTokenExpired, getTokenExpireAt } = useContext(AuthContext);
  useEffect(() => {
    let mounted = true;
    axios.get('/')
      .then(res => {
        if (mounted) {
          setMsg(res.data.message)
        }
      })
      return () => (mounted = false);
  }, [])

  return (
    <div className="App">
      <p>{msg}</p>

    </div>
  );
}

export default Home;
