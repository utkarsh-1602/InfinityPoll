import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import decode from 'jwt-decode';

import { store } from '../store';
import { setToken, setCurrentUser, addError } from '../store/actions';

import NavBar from './NavBar';
import RouteViews from './RouteViews';
// import socketIO from 'socket.io-client';
import ChatPage from '../components/ChatPage';

// const socket = socketIO.connect('http://localhost:4000');
// console.log("Socket: ", socket);


// The code checks if there is a JWT token stored in the local storage
if (localStorage.jwtToken) { 
  setToken(localStorage.jwtToken); // If a token exists, it sets the token in the Redux store using the setToken action creator.
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken))); // if token is present, then it attempts to decode the token 
  } catch (err) {
    
    store.dispatch(setCurrentUser({}));
    // If decoding is successful, it dispatches the setCurrentUser action with the decoded user data to set the current user in the Redux store.

    store.dispatch(addError(err));
    // If decoding fails, it dispatches the setCurrentUser action with an empty object and adds an error to the Redux store using the addError action creator.

  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <NavBar />
        <RouteViews />
        <Route path="/chat" element={<ChatPage/>}></Route>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
