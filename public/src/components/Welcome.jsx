import React from 'react';
import Robot from '../assets/robot1.gif';

export default function Welcome({ currentUser }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'white',
      margin: 'auto',
    }}>
      <img
        src={Robot}
        alt="Robot"
        style={{ height: '40%' }}
      />
      <h1 style={{ textAlign: 'center', margin: '1rem' }}>
        Welcome, <span style={{ color: '#66d9ef' }}>{currentUser}</span>
      </h1>
      <h3 style={{textAlign: 'center', margin: '1rem'}}>Please Click on BroCode and Start your Baat-cheet</h3>
    </div>
  );
}
