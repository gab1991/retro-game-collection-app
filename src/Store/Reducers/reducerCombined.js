import { combineReducers } from 'redux';

import { LOG_OUT } from '../Actions/authActions';
import { appStateReducer } from 'Store/appStateReducer/reducer';
import { gameSelectorReducer } from 'Store/gameSelectorReducer/reducer';

import contentReducer from './contentReducer';
import ebayItemsReducer from './ebayItemsReducer';
import gameDetailedReducer from './gameDetailedReducer';
import loggedReducer from './loginReducer';
import profileReducer from './profileReducer';
import wishListReducer from './wishListReducer';

const appReducer = combineReducers({
  appState: appStateReducer,
  content: contentReducer,
  ebayItems: ebayItemsReducer,
  gameDetailed: gameDetailedReducer,
  gameSelector: gameSelectorReducer,
  logged: loggedReducer,
  profile: profileReducer,
  wishList: wishListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
