import React from 'react';
import Table from './components/TableComponent'; // Import your Table component
import Gallery from './components/GalleryComponent'; // Import your Gallery component

function App() {
  return (
    <div className="App">
      <Table /> {/* Use Table component */}
      <Gallery /> {/* Use Gallery component */}
    </div>
  );
}

export default App;