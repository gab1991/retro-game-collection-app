import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './comdinedReducers';

const composeEnhancer =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));

const getToken = (): string | null => {
  const state = store.getState();
  return state.logged.token;
};

export { getToken, store };
