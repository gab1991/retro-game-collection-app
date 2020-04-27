import loggedReducer from './isLogged';
import profileReducer from './profile';
import showHideAuth from './showAuth';
import showHideErr from './showErr';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer,
  showAuth: showHideAuth,
  showErr: showHideErr,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
