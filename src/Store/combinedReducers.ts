import { combineReducers } from 'redux';

import { IRootState } from './types';

import { gameDetailedReducer } from 'Routes/GameDetailed/reducer/reducer';
import { gameSelectorReducer } from 'Routes/GameSelector/reducer/reducer';
import { profileReducer } from 'Routes/Profile/reducer/reducer';
import { appStateReducer } from 'Store/appStateReducer/reducer';
import { authReducer } from 'Store/authReducer/reducer';
import { contentReducer } from 'Store/contentReducer/reducer';
import { ebayItemsReducer } from 'Store/ebayItemsReducer/reducer';

export const appReducer = combineReducers<IRootState>({
  appState: appStateReducer,
  auth: authReducer,
  content: contentReducer,
  ebayItems: ebayItemsReducer,
  gameDetailed: gameDetailedReducer,
  gameSelector: gameSelectorReducer,
  profile: profileReducer,
});
