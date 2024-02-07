import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../store/actions';

const Navbar = ({ auth, logout }) => (
  <nav className="navbar">
    <div className="container">
      <ul className="navbar-container">
        <li>
          <Link className="navbar-brand" to="/">
            Infinity Poll
          </Link>
        </li>
        {!auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link className="navbar-item" to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/login">
                Login
              </Link>
            </li>
          </Fragment>
        )}
        {auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link className="navbar-item" to="/poll/new">
                New Poll
              </Link>
            </li>
            <li>
              <a className="navbar-item" onClick={logout}>
                Logout
              </a>
            </li>
          </Fragment>
        )}
      </ul>
      {auth.isAuthenticated && (
        <p className="navbar-user">Logged in as {auth.user.username}</p>
      )}
    </div>
  </nav>
);

export default connect(
  store => ({
    auth: store.auth,
  }),
  { logout },
)(Navbar); //The brackets around Navbar in the connect function indicate that Navbar is the component being connected to the Redux store.


// The connect function is a higher-order function provided by the react-redux library.
// It connects a React component to the Redux store, enabling the component to access state from the store and dispatch actions to update the state

// How does it work?

// connect takes two main arguments: mapStateToProps and mapDispatchToProps.
// mapStateToProps: This function maps the Redux store's state to props that will be available to the connected component.
// mapDispatchToProps: This function maps action creators to props, allowing the connected component to dispatch actions.
// The result of connect is a new function that takes the component as an argument and returns a new connected component