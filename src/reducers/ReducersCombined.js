import loggedReducer from './isLogged';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  loggedReducer: loggedReducer
});

export default rootReducer;
