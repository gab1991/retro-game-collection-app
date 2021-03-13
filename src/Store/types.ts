import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TProfileReducer } from '../Routes/Profile/reducer/types';
import { TAppStateReducer } from './appStateReducer/types';
import { TAuthReducer } from './authReducer/types';
import { TContentReducer } from './contentReducer/types';
import { TEbayItemsReducer } from './ebayItemsReducer/types';
import { TAuthModalReducer } from 'Components/AuthModal/reducer/types';
import { TGameDetailedReducer } from 'Routes/GameDetailed/reducer/types';
import { TGameSelectorReducer } from 'Routes/GameSelector/reducer/types';
import { DeepReadonly } from 'utility-types';
export interface IRootState {
  appState: TAppStateReducer;
  authModal: TAuthModalReducer;
  content: TContentReducer;
  ebayItems: TEbayItemsReducer;
  gameDetailed: TGameDetailedReducer;
  gameSelector: TGameSelectorReducer;
  logged: TAuthReducer;
  profile: TProfileReducer;
}

export type TThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>;

export type TSelector<ReturnType> = (state: IRootState) => DeepReadonly<ReturnType>;
