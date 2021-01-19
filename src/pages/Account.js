import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import Button from '@material-ui/core/Button';
import { axios } from '../constants/API';

function Account() {
	const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  function executePost(body) {
    setLoading(true);
    axios.post(`/logout`, body.data)
      .then(res => {
        logout();
        window.location.reload();
      })
      .catch(
        err => {
          setLoading(false);
        }
      )    
  }

  return (
    <div className="App">
      <p>Your Account</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={executePost}
          >
            Logout
          </Button>      
    </div>
  );
}

export default Account;
