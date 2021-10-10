import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { IS_PROD } from 'Configs/server.config';

import { appReducer } from './combinedReducers';

const composeEnhancer = (IS_PROD && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));
