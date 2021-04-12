import { produce } from 'immer';

import { TProfileActions, TProfileReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TProfileReducer = null;

export const profileReducer = createReducer<TProfileReducer, TProfileActions>(initial)
  .handleAction(actions.fillProfile, (_, { payload }): TProfileReducer => payload)
  .handleAction(
    [actions.reorderGames.failure, actions.reorderGames.request, actions.reorderGames.success],
    (state, { payload }): TProfileReducer =>
      produce(state, (draft) => {
        const { newSortedGames, list, platform } = payload;
        const profileList = draft?.[list];

        if (!profileList || !draft) {
          return;
        }

        const changedPlatformInd = profileList.platforms.findIndex(({ name }) => name === platform);

        if (changedPlatformInd < 0) {
          return;
        }

        draft[list].platforms[changedPlatformInd].games = newSortedGames;
      })
  )
  .handleAction(actions.flushProfile, (): TProfileReducer => initial);
