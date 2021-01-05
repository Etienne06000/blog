import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import Button from '@material-ui/core/Button';

function Account() {
	const { logout } = useContext(AuthContext);
  return (
    <div className="App">
      <p>Your Account</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={logout}
          >
            Logout
          </Button>      
    </div>
  );
}

export default Account;
