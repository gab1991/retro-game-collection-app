import loggedReducer from './isLogged';
import profileReducer from './profile';
import {
  showHideErr,
  showHideInfo,
  showHideAuth,
  showHideCornerNotifier,
} from './showModals';
import dataCache from './dataCache';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer,
  showAuth: showHideAuth,
  showErr: showHideErr,
  showInfo: showHideInfo,
  showCornNotifier: showHideCornerNotifier,
  dataCache: dataCache,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
