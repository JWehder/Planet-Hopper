import React, { useState } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import './App.css';
import HomePage from './features/listing/pages/Homepage';

function App() {
  const [show, setShow] = useState(true)
  
  const handleClick = () => setShow(!show)

  return (
    <div style={{ width: '900px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
      <button onClick={handleClick}>show modal</button>
      <LoginModal show={show} setShow={setShow} />
      <HomePage />
    </div>
  );
}

export default App;
