import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './combinedReducers';

const composeEnhancer =
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));
