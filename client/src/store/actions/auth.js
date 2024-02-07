import { addError, removeError } from './error';
import { SET_CURRENT_USER } from '../actionTypes';
import API from '../../services/api';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const setToken = token => {
  API.setToken(token);
};

// This code defines a function called logout that is responsible for logging out a user from the application.
export const logout = () => {
  // The return dispatch statement is used in Redux thunk functions to enable asynchronous actions.
  // dispatch is a function provided by Redux that allows you to dispatch actions to the Redux store. Dispatching an action means you're signaling to Redux that something has happened in your application, and it should update its state accordingly.

  // By returning a function that accepts dispatch as an argument from an action creator, you're enabling the Redux thunk middleware to intercept this function call. The middleware will then invoke this function with dispatch as an argument, allowing you to dispatch multiple actions asynchronously or perform other side effects like making API calls.
  return dispatch => {

    localStorage.clear();
    // Clear Local Storage: It clears any data stored in the local storage of the browser. This typically includes things like authentication tokens or user preferences that were saved during the user's session.

    API.setToken(null); // Remove Token: It calls a function named setToken from an object named API, passing null as an argument. This function likely removes or clears any token used for authentication.

    dispatch(setCurrentUser({}));
    // This action sets the current user in the Redux store to an empty object, effectively removing any information about the current user.

    dispatch(removeError());
    // This action removes any error messages that might have been stored in the Redux store, ensuring a clean state after logout.

  };
};

// This code defines an authUser function that handles user authentication
// authUser(path, data) takes two parameters:
  // path: Specifies the endpoint path for authentication (e.g., 'login' or 'register').
  // data: Contains the user credentials or registration data

export const authUser = (path, data) => {
  return async dispatch => {
    try {

      const { token, ...user } = await API.call('post', `auth/${path}`, data);
      // ...user is used to create a new object called user containing all the properties from the response object except for token

      localStorage.setItem('jwtToken', token);
      // After receiving the token from the server, it's stored in the browser's local storage under the key 'jwtToken'. This allows the token to persist across browser sessions.


      API.setToken(token);  
      // The received token is also set as the authentication token in the API configuration. This ensures that subsequent API requests include the token for authentication.

      dispatch(setCurrentUser(user));
      // After successful authentication, the setCurrentUser action is dispatched with the user data extracted from the response. This updates the Redux store with the current user information.

      dispatch(removeError());
      // Any existing error messages in the Redux store are removed using the removeError action, ensuring a clean state.

    } catch (err) {
      const { error } = err.response.data;
      // In case of an error during the API call, the error message is extracted from the response data. This is how you can extract error message from response data
      dispatch(addError(error));
      // The addError action is dispatched with the error message, adding it to the Redux store to notify the user of the error.
    }
  };
};
