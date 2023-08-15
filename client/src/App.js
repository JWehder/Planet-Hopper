import React, { useState, useEffect } from 'react';
import LoginModal from './features/auth/pages/LoginModal';
import './App.css';
import HomePage from './features/listing/pages/Homepage';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ListingPage from './features/listing/pages/ListingPage'
import NavBar from './features/common/NavBar';
import SearchResults from './features/listing/components/SearchResults';
import { getUser } from './features/auth/state/authSlice';
import { useDispatch } from 'react-redux';
import { setUsersCoordinates } from './features/listing/state/listingsSlice';
import BookPage from './features/booking/pages/BookPage';
import BookedViewPage from './features/booking/pages/BookedViewPage';
import Spinner from "react-bootstrap/Spinner"
import ProfilePage from './features/auth/pages/ProfilePage.';
import { CenterDiv } from './styles/Styles';
import LogoutPage from './features/auth/pages/LogoutPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';

function App() {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (window.location.pathname !== "/forgot_password") {
      dispatch(getUser())
    }
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
            setRender(true)
        }
    } else {
        dispatch(setUsersCoordinates(null))
        setRender(true)
        console.log("Geolocation is not supported by this browser")
    }
}

  const usersCoordinates = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ 
                  users_latitude: latitude, 
                  users_longitude: longitude 
                });
            },
            (error) => {
                reject(error)
            }
        );
    });
  };

  if (!render) return 
  <CenterDiv>    
  <Spinner 
  animation="border" 
  role="status" />
  </CenterDiv>

  return (
    <div style={{backgroundColor: '#F8F5FF'}}>
    <NavBar />
    <LoginModal />
    <div>
    <Switch>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/forgot_password"> 
        <ForgotPasswordPage />
      </Route>
      <Route exact path="/">
          <LoginModal show={show} setShow={setShow} />
          <HomePage />
      </Route>
      <Route exact path='/listings/:listing_name/:id'>
          <ListingPage />
      </Route>
      <Route exact path='/search_results/:value'>
          <SearchResults />
      </Route>
      <Route exact path='/book/:listing_name/:id'>
        <BookPage />
      </Route>
      <Route exact path='/bookings'>
        <BookedViewPage />
      </Route>
      <Route exact path='/logout'>
        <LogoutPage />
      </Route>
    </Switch>
    </div>
    </div>
  );
}

export default App;
