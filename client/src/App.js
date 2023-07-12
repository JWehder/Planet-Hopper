import React, { useState, useEffect } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import './App.css';
import HomePage from './features/listing/pages/Homepage';
import { Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ListingPage from './features/listing/pages/ListingPage'
import NavBar from './features/common/NavBar';
import MapModal from './features/listing/pages/MapModal';
import SearchResults from './features/listing/components/SearchResults';
import { getUser } from './features/auth/state/authSlice';
import { useDispatch } from 'react-redux';
import { setUsersCoordinates } from './features/listing/state/listingsSlice';
import BookPage from './features/booking/pages/BookPage';
import BookedViewPage from './features/booking/pages/BookedViewPage';
import ListingGallery from './features/listing/components/ListingGallery';
import Spinner from "react-bootstrap/Spinner"
import ProfilePage from './features/auth/pages/ProfilePage.';

function App() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(false)
  
  const handleClick = () => setShow(true)

  useEffect(() => {
    dispatch(getUser())
    fetchCoordinates()
  }, []);

  const fetchCoordinates = async () => {
    if (navigator.geolocation) {
        try {
            const coordinates = await usersCoordinates();
            dispatch(setUsersCoordinates(coordinates))
            setRender(true)
        } catch (error) { 
            console.error("Error:", error)
        }
    } else {
        dispatch(setUsersCoordinates(null))
        console.log("Geolocation is not supported by this browser")
    }
}

  const usersCoordinates = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error)
            }
        );
    });
  };

  // one button with a button group inside of it that are all disabled buttons but there for esthetics, needs to be hoverable
  // when clicked, it shows another button group with each being clickable. When clicked, they will show a popover with the input
  // how will I have a description underneath the button title 

  if (!render) return 
  <div style={{ justifyContent: 'center', textAlign: 'center'}}>    
  <Spinner 
  animation="border" 
  role="status" />
  </div>

  return (
    <div style={{backgroundColor: '#F8F5FF'}}>
    <NavBar />

    <div>
    <Switch>
      <Route exact path="/profile_page">
        <ProfilePage />
      </Route>
      <Route exact path='/maps'>
        <MapModal />
      </Route>
      <Route exact path='/'>
          <LoginModal show={show} setShow={setShow} />
          <HomePage />
      </Route>
      <Route exact path='/listings/:value'>
          <ListingPage />
      </Route>
      <Route exact path='/search_results/:value'>
          <SearchResults />
      </Route>
      <Route exact path="/listings_gallery">
        <ListingGallery />
      </Route>
      <Route exact path='/listings/:id/book'>
        <BookPage />
      </Route>
      <Route exact path='/bookings'>
        <BookedViewPage />
      </Route>
    </Switch>
    </div>
    </div>
  );
}

export default App;
