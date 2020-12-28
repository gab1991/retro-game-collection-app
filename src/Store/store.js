import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Reducers/reducerCombined';

const composeEnhancer =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

const getToken = () => {
  const state = store.getState();
  return state.logged.token;
};

export { getToken, store };
