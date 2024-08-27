import React, { useState } from 'react';
import { Button, Drawer as AntDrawer } from 'antd';
import { supabase } from '../createClient';

const LoginDrawer = ({ user, onChange, onSubmit , onLogin, onLogout}) => {
  const [open, setOpen] = useState(false);

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) {
      console.error('Error logging in: ', error);
    } else {
      console.log('Login successful');
    }
  }  

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out: ', error);
    } else {
      console.log('Logout successful');
    } 
  }

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
          <input type="text" placeholder="Add Player" name='Player' value={user.Player} onChange={onChange} />
          <button type="submit">Add Player</button>
        </form> 
        <button onClick={onLogin}>Login</button>
        <button onClick={onLogout}>Logout</button>
      </AntDrawer>
    </>
  );
};

export default LoginDrawer;