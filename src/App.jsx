import React, { useState, useEffect } from 'react';
import Table from './components/TableComponent'; // Import your Table component
import Gallery from './components/GalleryComponent'; // Import your Gallery component
 import { supabase } from './createClient'; // Adjust the path as needed
import LoginDrawer from './components/LoginDrawer';



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

const handleDelete = async (Player) => {
  const { error } = await supabase
    .from('Team_Roster')
    .delete()
    .eq('Player', Player);

  if (error) {
    console.error('Error deleting row: ', error);
  } else {
    fetchUsers(); 
  }
};
const handleDecrement = async (Player) => {
  // Fetch the current score
  const { data: userData, error: userError } = await supabase
    .from('Team_Roster')
    .select('Score')
    .eq('Player', Player);

  if (userError) {
    console.error('Error fetching user: ', userError);
    return;
  }

  // Check if the score is already zero
  if (userData[0].Score === 0) {
    console.log('Score cannot go below zero');
    return;
  }

  // Decrement the score
  const newScore = userData[0].Score - 1;

  // Update the score in the database
  const { data, error } = await supabase
    .from('Team_Roster')
    .update({ Score: newScore })
    .eq('Player', Player);

  if (error) {
    console.error('Error decrementing score: ', error);
  } else {
    // Update the local state
    fetchUsers();
  }
};

const handleIncrement = async (Player) => {
  // Fetch the current score
  const { data: userData, error: userError } = await supabase
    .from('Team_Roster')
    .select('Score')
    .eq('Player', Player);

  if (userError) {
    console.error('Error fetching user: ', userError);
    return;
  }

  // Increment the score
  const newScore = userData[0].Score + 1;

  // Update the score in the database
  const { data, error } = await supabase
    .from('Team_Roster')
    .update({ Score: newScore })
    .eq('Player', Player);

  if (error) {
    console.error('Error incrementing score: ', error);
  } else {
    // Update the local state
    fetchUsers();
  }
};


  return (
    <div className="App">
     <Table data={users} handleDelete={handleDelete} handleIncrement={handleIncrement} handleDecrement={handleDecrement}/> 
      <LoginDrawer user={user} onChange={handleChange} onSubmit={createUsers} />
      <Gallery /> 
    </div>
  );
}

export default App;