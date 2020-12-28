import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TAppStateReducer } from './appStateReducer/types';
import { TGameSelectorReducer } from './gameSelectorReducer/types';
export interface IRootState {
  appState: TAppStateReducer;
  gameSelector: TGameSelectorReducer;
}

export type TThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action<string>>;
