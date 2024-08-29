import React, { useState } from 'react';
import { Button, Drawer as AntDrawer } from 'antd';



const LoginDrawer = ({ user, onChange, onSubmit, onLogin, onLogout, isLoggedIn }) => {
  const [open, setOpen] = useState(false);

  const handleLoginClick = (event) => {
    event.preventDefault();
    console.log('Login button clicked');
    onLogin();
  };

  const handleLogoutClick = (event) => {
    event.preventDefault();
    console.log('Logout button clicked');
    onLogout();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ position: 'absolute', top: 0, right: 0 }}>
        Click ME!
      </Button>
      <AntDrawer title="Basic Drawer" onClose={onClose} visible={open}>
        <form onSubmit={onSubmit}>
<input 
  type="text" 
  placeholder="Add Player" 
  name='Player' 
  value={user?.Player || ''} 
  onChange={onChange} 
/>
          <button type="submit">Add Player</button>
        </form> 
        <button type="button" onClick={handleLoginClick}>Login</button>
        {isLoggedIn && (
          <button type="button" onClick={handleLogoutClick}>Logout</button>
        )}
      </AntDrawer>
    </>
  );
};

export default LoginDrawer;

