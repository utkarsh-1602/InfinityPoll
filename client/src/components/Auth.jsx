import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authUser, logout } from '../store/actions';

class Auth extends Component {
  constructor(props) {
    super(props);
    // By calling super(props), you're essentially calling the constructor of the parent class and passing the props object to it. This ensures that the parent class is properly initialized before initializing the subclass.

    this.state = {
      username: '',
      password: '',
    };

    // The component's state (this.state) is used to store data that may change over time and affect the component's rendering.
    // In this case, the state holds the values of username and password, which are expected to be entered by the user in input fields.


    this.handleChange = this.handleChange.bind(this);
    // This part of the line binds the handleChange method to the current component instance. The bind() method creates a new function that, when called, has this set to the value passed as an argument (in this case, this, which refers to the component instance).
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const { authType, socket } = this.props;
    e.preventDefault();
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { username, socketID: socket.id });
    this.props.authUser(authType || 'login', { username, password });
  }

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label" htmlFor="username">
            username{' '}
          </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={this.handleChange}
            autoComplete="off"
            className="form-input"
          />
          <label className="form-label" for="password">
            password{' '}
          </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={this.handleChange}
            autoComplete="off"
            className="form-input"
          />
          <div className="buttons_center">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), { authUser, logout })(Auth);
// In summary, while the Auth component doesn't directly receive props related to Redux store state, it indirectly receives action creators (authUser and logout) as props from the connect function.
//  the provided Auth.jsx component, props are being received indirectly through the connect function provided by react-redux.
// connect() is a higher-order function call to the connect function provided by react-redux.
// connect is used to connect a React component to the Redux store. It's a function that returns another function, which then wraps around your component
