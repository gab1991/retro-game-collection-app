import loggedReducer from './isLogged';
import profileReducer from './profile';
import showHideAuth from './showAuth';
import showHideErr from './showErr';
import dataCache from './dataCache';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer,
  showAuth: showHideAuth,
  showErr: showHideErr,
  dataCache: dataCache,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
