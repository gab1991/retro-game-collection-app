import loggedReducer from './loginReducer';
import profileReducer from './profileReducer';
import gameSelectorReducer from './gameSelectorReducer';
import {
  showHideErr,
  showHideInfo,
  showHideAuth,
  showHideCornerNotifier,
} from './modalReducer';
import dataCache from './cacheReducer';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer,
  showAuth: showHideAuth,
  showErr: showHideErr,
  showInfo: showHideInfo,
  showCornNotifier: showHideCornerNotifier,
  gameSelector: gameSelectorReducer,
  // dataCache: dataCache,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
