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
      <AntDrawer
        title="Login Drawer"
        placement="right"
        onClose={onClose}
        open={open}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose}>Close</Button>
          </div>
        }
      >
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Add Player" 
            name='Player' 
            value={user?.Player || ''} 
            onChange={onChange} 
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Add Player
          </Button>
        </form>
        <Button type="default" onClick={handleLoginClick} style={{ marginTop: '10px' }}>
          Login
        </Button>
        {isLoggedIn && (
          <Button type="default" onClick={handleLogoutClick} style={{ marginTop: '10px' }}>
            Logout
          </Button>
        )}
      </AntDrawer>
    </>
  );
};

export default LoginDrawer;


