import { combineReducers } from 'redux';

import { gameDetailedReducer } from 'Routes/GameDetailed/gameDetailedReducer/reducer';
import { appStateReducer } from 'Store/appStateReducer/reducer';
import { authReducer } from 'Store/authReducer/reducer';
import { contentReducer } from 'Store/contentReducer/reducer';
import { ebayItemsReducer } from 'Store/ebayItemsReducer/reducer';
import { gameSelectorReducer } from 'Store/gameSelectorReducer/reducer';
import { profileReducer } from 'Store/profileReducer/reducer';

export const appReducer = combineReducers({
  appState: appStateReducer,
  content: contentReducer,
  ebayItems: ebayItemsReducer,
  gameDetailed: gameDetailedReducer,
  gameSelector: gameSelectorReducer,
  logged: authReducer,
  profile: profileReducer,
});
