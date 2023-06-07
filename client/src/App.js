import React, { useState } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import './App.css';
import HomePage from './features/listing/pages/Homepage';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const [show, setShow] = useState(true)
  
  const handleClick = () => setShow(!show)

  return (
    <div style={{ width: '900px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
    <Switch>
      <Route exact path='/'>
          <button onClick={handleClick}>show modal</button>
          <LoginModal show={show} setShow={setShow} />
          <HomePage />
      </Route>
      <Route exact path='listings/:id'>
          
      </Route>
      <Route exact path='listings/search_results/:value'>

      </Route>
    </Switch>
    </div>
  );
}

export default App;
