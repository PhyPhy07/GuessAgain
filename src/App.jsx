import React, { useState, useEffect } from 'react';
import Table from './components/TableComponent'; // Import your Table component
import Gallery from './components/GalleryComponent'; // Import your Gallery component
import { supabase } from './createClient'; 

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    Player: '', Score: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from('Team_Roster').select('*');
    if (error) {
      console.error('Error fetching users: ', error);
    } else {
      setUsers(data);
    }
  }

  useEffect(() => {
    console.log(users);
  }, [users]);

  function handleChange(event) {
    setUser(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await supabase
      .from('Team_Roster')
      .insert({ Player: user.Player, Score: 0 });
    fetchUsers(); // Fetch users again to update the table
  }

async function createUsers(event) {
  event.preventDefault();
  const { data, error } = await supabase
    .from('Team_Roster')
    .insert({ Player: user.Player, Score: 0 });
  if (error) {
    console.error('Error creating user: ', error);
  } else {
    fetchUsers();
  }
}

  return (
    <div className="App">
      <Table data={users} /> 
      <form onSubmit={createUsers}>     
        <input type="text" placeholder="Add Player" name='Player' onChange={handleChange} />
        <button type="submit">Add Player</button>
      </form>
      <Gallery /> 
    </div>
  );
}

export default App;