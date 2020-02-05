import React from 'react';
import './App.css';
import Jobs from './Jobs';
import fetch from 'node-fetch';

const JOB_API_URL = 'http://localhost:3001/jobs';

const mockJobs = [
  {title:'Software Engineer 1',company: 'Google'},
  {title:'Software Engineer 2',company: 'Facebook'},
  {title:'Software Engineer 3',company: 'Twitter'}
  
]


async  function fetchJobs(updateCb){
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
  
  console.log({json});
}

function App() {
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() =>{
    fetchJobs(updateJobs);

  }, [])
  return (
    <div className="App">
      <Jobs jobs={jobList} />
      
    </div>
  );
}

export default App;
