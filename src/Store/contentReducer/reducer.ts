import { produce } from 'immer';

import { TContentActions, TContentReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';
const initial: TContentReducer = {
  boxArts: {},
};

export const contentReducer = createReducer<TContentReducer, TContentActions>(initial).handleAction(
  actions.setBoxArtUrl,
  (state, { payload }) => {
    const { platform, gameName, url } = payload;

    if (!gameName || !url) return state;

    return produce(state, (draft) => {
      draft.boxArts[platform] = { ...draft.boxArts[platform] };
      draft.boxArts[platform][gameName] = url;
    });
  }
);
