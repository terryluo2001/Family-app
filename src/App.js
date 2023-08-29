import React, { useState, useEffect} from 'react';
import './App.css';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_family_members?search=${searchQuery}`)
      .then(response => response.json())
      .then(data => setFamilyMembers(data))
      .catch(error => console.error('Error fetching family members:', error));
  }, [searchQuery]);
  return (
    <div className="App">
      <h1>Family Members</h1>
      <div className="search-function">  
      <input
        type="text"
        placeholder="Search for family member..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='search-bar'
      />
        <button 
            onClick={() => setSearchQuery('')}
            className='delete-search'
          >
              Clear Search
        </button>
        <div className="search-results">
        {familyMembers
          .map(Member => (
            <div key={Member.id}>
              <h2>{Member["First Name"] + " " + Member["Last Name"]}</h2>
              <p>Identity: {Member["Identity"]}</p>
              <p>Age: {Member["Age"]}</p>
              <p>Gender: {Member["Gender"]}</p>
              <p>Ethnicity: {Member["Ethnicity"]}</p>
              <p>Occupation: {Member["Occupation"]}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;