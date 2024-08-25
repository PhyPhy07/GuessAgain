import React, { useState, useEffect } from 'react';
import Table from './components/TableComponent'; // Import your Table component
import Gallery from './components/GalleryComponent'; // Import your Gallery component
import { supabase } from './createClient'; 

function App() {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="App">
      <Table data={users} /> 
      <Gallery /> 
    </div>
  );
}

export default App;