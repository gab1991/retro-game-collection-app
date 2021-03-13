import { combineReducers } from 'redux';

import { authModalReducer } from 'Components/AuthModal/reducer/reducer';
import { gameDetailedReducer } from 'Routes/GameDetailed/reducer/reducer';
import { gameSelectorReducer } from 'Routes/GameSelector/reducer/reducer';
import { profileReducer } from 'Routes/Profile/reducer/reducer';
import { appStateReducer } from 'Store/appStateReducer/reducer';
import { authReducer } from 'Store/authReducer/reducer';
import { contentReducer } from 'Store/contentReducer/reducer';
import { ebayItemsReducer } from 'Store/ebayItemsReducer/reducer';

export const appReducer = combineReducers({
  appState: appStateReducer,
  authModal: authModalReducer,
  content: contentReducer,
  ebayItems: ebayItemsReducer,
  gameDetailed: gameDetailedReducer,
  gameSelector: gameSelectorReducer,
  logged: authReducer,
  profile: profileReducer,
});
