import React, { useState } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import './App.css';
import HomePage from './features/listing/pages/Homepage';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ListingPage from './features/listing/pages/ListingPage'
import Button from '@mui/material/Button';
import NavBar from './features/common/NavBar';
import MapModal from './features/listing/pages/MapModal';
import SearchResults from './features/listing/components/SearchResults';
import SearchBarButtonGroup from './features/listing/components/SearchBarButtonGroup';

function App() {
  const [show, setShow] = useState(true)
  
  const handleClick = () => setShow(!show)

  // one button with a button group inside of it that are all disabled buttons but there for esthetics, needs to be hoverable
  // when clicked, it shows another button group with each being clickable. When clicked, they will show a popover with the input
  // how will I have a description underneath the button title 

  return (
    <div style={{ width: '1100px', textAlign: 'center', margin: '0 auto', backgroundColor: '#FFFAFA' }}>
    <NavBar />
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "15px"
    }}>
      <SearchBarButtonGroup />
    </div>
    <Switch>
      <Route exact path='/maps'>
        <MapModal />
      </Route>
      <Route exact path='/'>
          <Button onClick={handleClick} variant="container" color="primary">show modal</Button>
          <LoginModal show={show} setShow={setShow} />
          <HomePage />
      </Route>
      <Route exact path='/listings/:value'>
          <ListingPage />
      </Route>
      <Route exact path='/search_results/:value'>
          <SearchResults />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
