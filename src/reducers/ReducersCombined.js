import loggedReducer from './isLogged';
import profileReducer from './profile';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer
});

export default rootReducer;
