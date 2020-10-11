import loggedReducer from './loginReducer';
import profileReducer from './profileReducer';
import gameSelectorReducer from './gameSelectorReducer';
import gameDetailedReducer from './gameDetailedReducer';
import appStateReducer from './appStateReducer';
import ebayItemsReducer from './ebayItemsReducer';
import contentReducer from './contentReducer';
import wishListReducer from './wishListReducer';
import { LOG_OUT } from '../Actions/authActions';

import { combineReducers } from 'redux';

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
