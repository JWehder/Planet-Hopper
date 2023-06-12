import React, { useState } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import './App.css';
import HomePage from './features/listing/pages/Homepage';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ListingPage from './features/listing/pages/ListingPage';
import Button from '@mui/material/Button';
import NavBar from './features/common/NavBar';
import Map from './features/listing/components/Map';
import MapModal from './features/listing/pages/MapModal';
import SearchForm from './features/listing/components/SearchForm';

function App() {
  const [show, setShow] = useState(true)
  
  const handleClick = () => setShow(!show)

  return (
    <div style={{ width: '1100px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
    <NavBar />
    <Switch>
      <Route exact path='/maps'>
        <MapModal />
      </Route>
      <Route exact path='/'>
          <Button onClick={handleClick} variant="container" color="primary">show modal</Button>
          <LoginModal show={show} setShow={setShow} />
          <HomePage />
      </Route>
      <Route exact path='listings/:id'>
          <ListingPage />
      </Route>
      <Route exact path='listings/search_results/:value'>

      </Route>
    </Switch>
    </div>
  );
}

export default App;
