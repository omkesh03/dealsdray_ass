import React from 'react';
import '../App.css';
import Heading from './Heading';

function Dashboard() {
  return (
<div>
    <Heading></Heading>
    <p className='yellow-strip'>Welcome to the Dashboard!</p>
    <p className='container'>Welcome to addmin panel</p>
</div>
    
  );
}

export default Dashboard;