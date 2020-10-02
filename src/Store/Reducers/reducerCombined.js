import loggedReducer from './loginReducer';
import profileReducer from './profileReducer';
import gameSelectorReducer from './gameSelectorReducer';
import gameDetailedReducer from './gameDetailedReducer';
import appStateReducer from './appStateReducer';
import {
  showHideErr,
  showHideInfo,
  showHideAuth,
  showHideCornerNotifier,
} from './modalReducer';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer,
  showAuth: showHideAuth,
  showErr: showHideErr,
  showInfo: showHideInfo,
  showCornNotifier: showHideCornerNotifier,
  gameSelector: gameSelectorReducer,
  gameDetailed: gameDetailedReducer,
  appState: appStateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
