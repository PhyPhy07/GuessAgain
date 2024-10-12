import React, { useState, useEffect } from 'react';
import Table from './components/TableComponent'; 
import Gallery from './components/GalleryComponent';
import { supabase } from './createClient'; 
import LoginDrawer from './components/LoginDrawer';


function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ Player: '', Score: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
  const fetchSession = async () => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error);
    } else {
      console.log('Session data:', session);
      setUser2(session?.user || null);
    }
  };

  fetchSession();

  supabase.auth.onAuthStateChange((event, session) => {
    setTimeout(async () => {
      setUser2(session?.user || null);
  
    }, 0);
  });

  
}, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('Team_Roster').select('*');
    setLoading(false);
    if (error) {
      setError('Error fetching users: ' + error.message);
      console.error('Error fetching users: ', error);
    } else {
      setUsers(data);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from('Team_Roster')
      .insert({ Player: user.Player, Score: 0 });
    setLoading(false);
    if (error) {
      setError('Error creating user: ' + error.message);
      console.error('Error creating user: ', error);
    } else {
      fetchUsers();
    }
  };

  const handleDelete = async (Player) => {
    setLoading(true);
    const { error } = await supabase
      .from('Team_Roster')
      .delete()
      .eq('Player', Player);
    setLoading(false);
    if (error) {
      setError('Error deleting row: ' + error.message);
      console.error('Error deleting row: ', error);
    } else {
      fetchUsers();
    }
  };

  const handleScoreChange = async (Player, increment) => {
    setLoading(true);
    const { data: userData, error: userError } = await supabase
      .from('Team_Roster')
      .select('Score')
      .eq('Player', Player);
    if (userError) {
      setError('Error fetching user: ' + userError.message);
      console.error('Error fetching user: ', userError);
      setLoading(false);
      return;
    }

    const newScore = increment ? userData[0].Score + 1 : userData[0].Score - 1;
    if (newScore < 0) {
      setError('Score cannot go below zero');
      console.log('Score cannot go below zero');
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('Team_Roster')
      .update({ Score: newScore })
      .eq('Player', Player);

    setLoading(false);
    if (updateError) {
      setError('Error updating score: ' + updateError.message);
      console.error('Error updating score: ', updateError);
    } else {
      fetchUsers();
    }
  };

  const login = async () => {
    try {
      console.log('Attempting to login');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        redirectTo: window.location.origin
      });
      if (error) {
        console.error('Error logging in: ', error);
      } else {
        console.log('Login successful', data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    console.log('Attempting to logout');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out: ', error);
    } else {
      console.log('Logout successful');
      setUser(null); // Clear user state on logout
    }
  };

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
<iframe 
className='spotify'
  style={{borderRadius: "12px"}} 
  src="https://open.spotify.com/embed/playlist/3MR2J2enuLTLZvxMkHI32h?utm_source=generator&theme=0" 
  height="152" 
  frameBorder="0" 
  allowFullScreen="" 
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
  loading="lazy">
</iframe>
      <Table
        data={users}
        handleDelete={handleDelete}
        handleIncrement={(Player) => handleScoreChange(Player, true)}
        handleDecrement={(Player) => handleScoreChange(Player, false)}
        isLoggedIn={!!user2}
      />
      <LoginDrawer
        user={user}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onLogin={login}
        onLogout={logout}
        isLoggedIn={!!user} 
      />
      <Gallery />
    </div>
  );
}
export default App;
