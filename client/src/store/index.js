import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const DEFAULT_STATE = {
  auth: { isAuthenticated: false },
  error: { message: null },
  polls: [],
  currentPoll: {
    _id: '5b086e20f7d2381502ce0e46',
    options: [],
    question: 'test_poll',
  },
};

// Define composeEnhancers for Redux DevTools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// composeEnhancers is a variable that holds the compose function from Redux DevTools extension if available, otherwise, it holds the compose function from Redux.
// This allows Redux DevTools extension to be used if it's installed in the browser. It enhances the store with debugging capabilities and time-traveling features.


// Create Redux store with middleware and DevTools extension
export const store = createStore(
  rootReducer,
  DEFAULT_STATE,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
