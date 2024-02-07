// In a Redux application, the reducers folder typically contains functions called "reducers" that are responsible for specifying how the application's state changes in response to actions dispatched to the Redux store.

// This is a Redux reducer function responsible for managing the state related to the current user authentication status.
import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: // When the SET_CURRENT_USER action is dispatched, the reducer updates the state with the new user information.

      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
      };
    default:
      return state;
  }
};
