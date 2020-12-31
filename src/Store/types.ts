import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TAppStateReducer } from './appStateReducer/types';
import { TContentReducer } from './contentReducer/types';
import { TGameSelectorReducer } from './gameSelectorReducer/types';
import { DeepReadonly } from 'utility-types';
export interface IRootState {
  appState: TAppStateReducer;
  content: TContentReducer;
  gameSelector: TGameSelectorReducer;
}

export type TThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>;

export type TSelector<ReturnType> = (state: IRootState) => DeepReadonly<ReturnType>;
