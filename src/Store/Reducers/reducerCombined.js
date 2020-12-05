import { combineReducers } from 'redux';

import { LOG_OUT } from '../Actions/authActions';

import appStateReducer from './appStateReducer';
import contentReducer from './contentReducer';
import ebayItemsReducer from './ebayItemsReducer';
import gameDetailedReducer from './gameDetailedReducer';
import gameSelectorReducer from './gameSelectorReducer';
import loggedReducer from './loginReducer';
import profileReducer from './profileReducer';
import wishListReducer from './wishListReducer';

const appReducer = combineReducers({
  logged: loggedReducer,
  profile: profileReducer,
  gameSelector: gameSelectorReducer,
  gameDetailed: gameDetailedReducer,
  wishList: wishListReducer,
  content: contentReducer,
  ebayItems: ebayItemsReducer,
  appState: appStateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
