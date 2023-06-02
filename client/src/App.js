import React, { useState } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './App.css';

function App() {
  const [show, setShow] = useState(true)

  const handleClose = () => setShow(false)
  const handleClick = () => setShow(!show)

  return (
    <div style={{ width: '900px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
      <button onClick={handleClick}>show modal</button>
      <LoginModal onClose={handleClose} show={show} />
    </div>
  );
}

export default App;
