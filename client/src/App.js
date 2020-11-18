import React, { useState } from 'react';
import './App.css';
import {saveAs} from 'file-saver';
import axios from 'axios';

//Importing Components
import UserDetails from './components/userDetails';
import Header from './components/header';
import NewSection from './components/newSection';


function App() {
  const defaultUser = {
    fName: 'Shashi',
    lName: 'Kant',
    age: '28',
    currentProfile: 'Full Stack Developer',
    email: 'shashi2290@gmail.com',
    phone: '6203362289',
  };
  const defaultSectionData = {
    title: "Enter the title",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  };
  const [user, setUser] = useState(defaultUser);
  const [readonly, setReadonly] = useState(false);
  const [sections, setSections] = useState([]);
  const [sectionData, setSectionData] = useState([defaultSectionData]);
  const [postedToDB, setPostedToDB] = useState(false);


  const addSection = () => {    
    setSections(()=> [...sections, <NewSection/>])    
  }

  //Saving resume in the Mongo cloud Atlas
  const saveResume = async () => {
    const resume = {...user, section: sectionData};
    console.log(resume);
    try {
      const response = await fetch('http://localhost:5000/resume', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(resume),
    });

    const data = await response.json();
    setPostedToDB(!postedToDB);
    alert(`Submitted Resume ${data}`);
    } catch (error) {
      console.log({message: error});
    }    
  }
  
  //delete resume from DB by querying the email-id
  const deleteResume = async () => {
    if (postedToDB) {
      try {
        const response = await fetch(`http://localhost:5000/resume/${user.email}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log({message: err});
      }
    }
    setReadonly(!readonly);
    setUser(defaultUser);
    setSectionData([defaultSectionData]);
    setSections([]);
  }

  const downloadPDF = () => {
    const resume = {...user, section: sectionData};
    axios.post('http://localhost:5000/create-pdf', resume)
    .then(() => axios.get('http://localhost:5000/fetch-pdf', {responseType: 'blob'}))
    .then((res) => {
      const pdfBlob = new Blob([res.data], {type: 'application/pdf'});

      saveAs(pdfBlob, 'newResume.pdf');
    })
  }


  // Rendering 
  return ( 

    <div>
      <div>
        {/* conditional rendering using ternary operator (condition ? <ifTrue>:<ifFalse>) */}
        {!readonly ? (
              <div className='header'>
                <Header />
                <button onClick={addSection} className='btn btn-primary' type="submit">Add New Section</button>
                <button onClick={(e) => setReadonly(!readonly)} className='btn btn-primary' type="submit">Proceed</button>        
              </div>
        ) : (
              <div className='header'>
                <button onClick={saveResume} className='btn btn-primary' type="submit">Save Resume</button>
                <button onClick={deleteResume} className='btn btn-primary' type="submit">Delete Resume</button>
                <button onClick={()=> window.print() } className='btn btn-primary' type="submit">Print</button>
                <button onClick={(e) => setReadonly(!readonly)} className='btn btn-primary' type="submit">Edit Resume </button>

                <button onClick={downloadPDF} className='btn btn-primary' type="submit">DownLoadPDF</button>
              </div>
        )}
      </div>     
      
      <div className='printSection'>
        <UserDetails readonly={readonly} user={user} setUser={setUser} />
        
        <div>
          {sections.map((section, index) => {
            if(!sectionData[index]){
              sectionData[index]=defaultSectionData;
            }
            return (
            <NewSection readonly={readonly} sectionData={sectionData} setSectionData={setSectionData} index={index}/>
          )
          })}        
        </div>
      </div>      
    </div>
  );

  
}

export default App;
