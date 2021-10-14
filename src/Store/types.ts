import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TProfileReducer } from '../Routes/Profile/reducer/types';
import { TAppStateReducer } from './appStateReducer/types';
import { TAuthReducer } from './authReducer/types';
import { TContentReducer } from './contentReducer/types';
import { TEbayItemsReducer } from './ebayItemsReducer/types';
import { TGameDetailedReducer } from 'Routes/GameDetailed/reducer/types';
import { TGameSelectorReducer } from 'Routes/GameSelector/reducer/types';
import { DeepReadonly } from 'utility-types';
export interface IRootState {
  appState: TAppStateReducer;
  auth: TAuthReducer;
  content: TContentReducer;
  ebayItems: TEbayItemsReducer;
  gameDetailed: TGameDetailedReducer;
  gameSelector: TGameSelectorReducer;
  profile: TProfileReducer;
}

export type TThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>;

export type TSelector<ReturnType, Args extends unknown[] = unknown[]> = (
  state: IRootState,
  ...args: Args
) => DeepReadonly<ReturnType>;
