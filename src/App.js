import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  

  useEffect(() => {
    // Fetch family members from the backend when the component mounts
    fetch('http://127.0.0.1:5000/get_family_members')
      .then(response => response.json())
      .then(data => {setFamilyMembers(data); return data;}) 
      .catch(error => console.error('Error fetching family members:', error));
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <div className="App">
      <h1>Family Members</h1>
      <div className="family-buttons">
        {familyMembers.map(member => (
          <button
            key={member.id}
            onClick={() => handleMemberClick(member)}
            className="member-button"
          >
            {member["First Name"]}
          </button>
        ))}
      </div>
      {selectedMember && (
        <div className="member-details">
          <h2>{selectedMember["First Name"]}</h2>
          <p>Age: {selectedMember["Age"]}</p>
          <p>Gender: {selectedMember["Gender"]}</p>
          <p>Occupation: {selectedMember["Occupation"]}</p>
          <p>Ethnicity: {selectedMember["Ethnicity"]}</p>
        </div>
      )}
    </div>
  );
}

export default App;