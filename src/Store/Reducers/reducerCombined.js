import { combineReducers } from 'redux';

import { appStateReducer } from 'Store/appStateReducer/reducer';
import { logOut } from 'Store/authReducer/actions';
import { authReducer } from 'Store/authReducer/reducer';
import { contentReducer } from 'Store/contentReducer/reducer';
import { gameSelectorReducer } from 'Store/gameSelectorReducer/reducer';

import ebayItemsReducer from './ebayItemsReducer';
import gameDetailedReducer from './gameDetailedReducer';
import profileReducer from './profileReducer';
import wishListReducer from './wishListReducer';

const appReducer = combineReducers({
  appState: appStateReducer,
  content: contentReducer,
  ebayItems: ebayItemsReducer,
  gameDetailed: gameDetailedReducer,
  gameSelector: gameSelectorReducer,
  logged: authReducer,
  profile: profileReducer,
  wishList: wishListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logOut) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
