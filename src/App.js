import React, { useState} from 'react';
import './App.css';
function App() {
  const [command, setCommand] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [streetAddr, setStreetAddr] = useState("");
  const [suburb, setSuburb] = useState("");
  const [dob, setDob] = useState("");
  const [isActive, setIsActive] = useState("");
  const [id, setId] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [updateClicked, setUpdateClicked] = useState(0);

  const handleId = (event) => {
    setId(event.target.value);
  }

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastName = (event) => {
    setLastName(event.target.value);
  }

  const handleMobileNo = (event) => {
    setMobileNo(event.target.value);
  }

  const handleEmailAddr = (event) => {
    setEmailAddr(event.target.value);
  }

  const handleStreetAddr = (event) => {
    setStreetAddr(event.target.value);
  }

  const handleSuburb = (event) => {
    setSuburb(event.target.value);
  }

  const handleDob = (event) => {
    setDob(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (command === "Add") {
      if (firstName !== "" && lastName !== "" && mobileNo !== "" && emailAddr !== "" && streetAddr !== "" && suburb !== "" && dob !== "") {
        fetch(`http://127.0.0.1:5000/add_patient?firstName=${firstName}&lastName=${lastName}&mobileNo=${mobileNo}&emailAddr=${emailAddr}&streetAddr=${streetAddr}&suburb=${suburb}&dob=${dob}`);    
        setFirstName("");
        setLastName("");
        setMobileNo("");
        setEmailAddr("");
        setStreetAddr("");
        setSuburb("");
        setDob("");
      }
    }
    else if (command === "Activate") {
      fetch(`http://127.0.0.1:5000/activate_patient?id=${id}`)
      setId("");
    }
    else if (command === "Deactivate") {
      fetch(`http://127.0.0.1:5000/deactivate_patient?id=${id}`)
      setId("");
    }
    else if (command === "Details") {
      fetch(`http://127.0.0.1:5000/patient_details?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPatientData(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      })
    }
    else if (command === "Update") {
      fetch(`http://127.0.0.1:5000/patient_details?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          setUpdateClicked(0);
        }
        else if (data.length === 1) {
          if (data[0]['Active'] === 'Yes') {
            setUpdateClicked(1);
            setFirstName(data[0]['First Name']);
            setLastName(data[0]['Last Name']);
            setMobileNo(data[0]['Mobile Number']);
            setEmailAddr(data[0]['Email Address']);
            setStreetAddr(data[0]['Street Address']);
            setSuburb(data[0]['Suburb']);
            setDob(data[0]['Date of birth']);
            setIsActive(data[0]['Active']);
          }
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      })
    }
  }

  const handleUpdate = (event) => {
    event.preventDefault(); 
    if (id !== "" && firstName !== "" && lastName !== "" && mobileNo !== "" && emailAddr !== "" && streetAddr !== "" && suburb !== "" && dob !== "") {
      fetch(`http://127.0.0.1:5000/update_patient?id=${id}&firstName=${firstName}&lastName=${lastName}&mobileNo=${mobileNo}&emailAddr=${emailAddr}&streetAddr=${streetAddr}&suburb=${suburb}&dob=${dob}&active=${isActive}`);    
      setFirstName("");
      setLastName("");
      setMobileNo("");
      setEmailAddr("");
      setStreetAddr("");
      setSuburb("");
      setDob("");   
      setId("");
      setId("");
      setUpdateClicked(0);
    }
  }

  return (
    <div className="App">
      <h1>Patients</h1>

      <button key="Add" 
      onClick={() => {
        setCommand('Add');
        setPatientData([]);
        setId("");
        setFirstName("");
        setLastName("");
        setMobileNo("");
        setEmailAddr("");
        setStreetAddr("");
        setSuburb("");
        setDob("");   
        setId("");
        setIsActive("");
        setUpdateClicked(0);
      }}
      style={{
        'background-color': '#2A59FE', 
        'color': '#ffffff', 
        'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>
        Add Patient
      </button>

      <button key="Update" 
      onClick={() => {
        setCommand('Update');
        setPatientData([]);
        setUpdateClicked(0);
        setId("");
      }}
      style={{
        'background-color': '#2A59FE', 
        'color': '#ffffff', 
        'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>
        Update Patient Details
      </button>
      
      <button key="Activate" 
      onClick={() => {
        setCommand('Activate');
        setPatientData([]);
        setUpdateClicked(0);
        setId("");
      }}
      style={{
        'background-color': '#2A59FE', 
        'color': '#ffffff', 
        'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>
        Activate Patient
      </button>

      <button key="Deactivate" 
      onClick={() => {
        setCommand('Deactivate');
        setPatientData([]);
        setUpdateClicked(0);
        setId("");
      }}
      style={{
        'background-color': '#2A59FE', 
        'color': '#ffffff', 
        'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>
        Deactivate Patient
      </button>

      <button key="Member Details" 
      onClick={() => {
        setCommand('Details');
        setId("");
        setPatientData([]);
        setUpdateClicked(0);
      }}
      style={{
        'background-color': '#2A59FE', 
        'color': '#ffffff', 
        'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>
        Find Details for a Patient
      </button>
    
    {command === "Add" && (  
      <div>
      <h2 style={{ marginBottom: '10px'}}>About</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="First Name"
            placeholder="First name"
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Last Name"
            placeholder="Last name"
            value={lastName}
            onChange={handleLastName}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Mobile number"
            placeholder="Mobile number"
            value={mobileNo}
            onChange={handleMobileNo}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Email Address"
            placeholder="Email address"
            value={emailAddr}
            onChange={handleEmailAddr}
          />
        </div>
        <h2 style={{ marginBottom: '10px'}}>Address</h2>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Street Address"
            placeholder="Street address"
            value={streetAddr}
            onChange={handleStreetAddr}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Suburb"
            placeholder="Suburb"
            value={suburb}
            onChange={handleSuburb}
          />
        </div>
        <h2 style={{ marginBottom: '10px'}}>Date of birth</h2>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            id="Date of Birth"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={handleDob}
          />
        </div>
        <button style={{
        marginBottom: '20px',
        'background-color': '#2A59FE', 
        'color': '#ffffff', 'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>Add Patient</button>
      </form>   
      </div>
    )}

    {command === "Activate" && (
      <div>
      <h2 style={{ marginBottom: '10px'}}>Activate a Patient</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Patient ID"
            placeholder="Enter the patient ID"
            value={id}
            onChange={handleId}
          />
        </div>
        <button style={{
        marginBottom: '20px',
        'background-color': '#2A59FE', 
        'color': '#ffffff', 'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>Activate Patient</button>
      </form>
      </div>
    )}

    {command === "Deactivate" && (
      <div>
      <h2 style={{ marginBottom: '10px'}}>Deactivate a Patient</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Patient ID"
            placeholder="Enter the patient ID"
            value={id}
            onChange={handleId}
          />
        </div>
        <button style={{
        marginBottom: '20px',
        'background-color': '#2A59FE', 
        'color': '#ffffff', 'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>Deactivate Patient</button>
      </form>
      </div>
    )}

    {command === "Update" && (
      <div>
      <h2 style={{ marginBottom: '10px'}}>Update a Patient's Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Patient ID"
            placeholder="Enter the patient ID"
            value={id}
            onChange={handleId}
          />
        </div>
        <button style={{
        marginBottom: '0px',
        'background-color': '#2A59FE', 
        'color': '#ffffff', 'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>Update Details</button>
      </form>
      {updateClicked === 1 && (
        <form onSubmit={handleUpdate}>  
      
        <h2 style={{ marginBottom: '10px'}}>About</h2>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="First Name"
            placeholder="First name"
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Last Name"
            placeholder="Last name"
            value={lastName}
            onChange={handleLastName}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Mobile number"
            placeholder="Mobile number"
            value={mobileNo}
            onChange={handleMobileNo}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Email Address"
            placeholder="Email address"
            value={emailAddr}
            onChange={handleEmailAddr}
          />
        </div>
        <h2 style={{ marginBottom: '10px'}}>Address</h2>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Street Address"
            placeholder="Street address"
            value={streetAddr}
            onChange={handleStreetAddr}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Suburb"
            placeholder="Suburb"
            value={suburb}
            onChange={handleSuburb}
          />
        </div>
        <h2 style={{ marginBottom: '10px'}}>Date of birth</h2>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            id="Date of Birth"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={handleDob}
          />
        </div>
        <button style={{
        marginBottom: '0px',
        'background-color': '#2A59FE', 
        'color': '#ffffff', 'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>Update Patient</button>
        </form>
      )}
      </div>
    )}
    
    {command === "Details" && (
      <div>
      <h2 style={{ marginBottom: '10px'}}>Find Details of a Patient</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            id="Patient ID"
            placeholder="Enter the patient ID"
            value={id}
            onChange={handleId}
          />
        </div>
        <button style={{
        marginBottom: '20px',
        'background-color': '#2A59FE', 
        'color': '#ffffff', 'border-color': '#2A59FE', 
        'border-style': 'solid', 
        'border-radius': '5px', 
        'marginRight': '10px'}}>Show Patient Details</button>
      </form>   
      <div>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {patientData.map(patient => (
            <li key={patient.id}>
              <div>First Name: {patient['First Name']}</div>
              <br />
              <div>Last Name: {patient['Last Name']}</div>
              <br />
              <div>Mobile Number: {patient['Mobile Number']}</div>
              <br />
              <div>Email Address: {patient['Email Address']}</div>
              <br />
              <div>Street Address: {patient['Street Address']}</div>
              <br />
              <div>Suburb: {patient['Suburb']}</div>
              <br />
              <div>Date of birth: {patient['Date of birth']}</div>
              <br />
              <div>Active: {patient['Active']}</div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )}

    </div>
  );
}

export default App;