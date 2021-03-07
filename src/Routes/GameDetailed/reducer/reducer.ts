import { produce } from 'immer';

import { EVideoType, TGameDetailedActions, TGameDetailedReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TGameDetailedReducer = {
  descriptionParsed: null,
  gameDetails: null,
  isOwned: false,
  isWished: false,
  screenshots: [],
  showOwnedNotifier: false,
  showWishListWarn: false,
  showWishNotifier: false,
  uploadableElms: {
    ebaySection: { show: true },
    gameplayVideo: { show: false, url: '' },
    soundtrackVideo: { show: false, url: '' },
  },
};

export const gameDetailedReducer = createReducer<TGameDetailedReducer, TGameDetailedActions>(initial)
  .handleAction(
    actions.setGameDetails,
    (state, { payload }): TGameDetailedReducer => ({ ...state, gameDetails: payload })
  )
  .handleAction(
    actions.setScreenshots,
    (state, { payload }): TGameDetailedReducer => ({ ...state, screenshots: payload })
  )
  .handleAction(
    actions.setDescriptionParsed,
    (state, { payload }): TGameDetailedReducer => ({ ...state, descriptionParsed: payload })
  )
  .handleAction(
    actions.setVideoUrl,
    (state, { payload }): TGameDetailedReducer => {
      const { type, url } = payload;

      const newUploadble = { ...state.uploadableElms };

      if (type === EVideoType.soundtrack) {
        newUploadble.soundtrackVideo = {
          ...newUploadble.soundtrackVideo,
          url,
        };
      }
      if (type === EVideoType.gameplay) {
        newUploadble.gameplayVideo = {
          ...newUploadble.gameplayVideo,
          url,
        };
      }
      return { ...state, uploadableElms: newUploadble };
    }
  )
  .handleAction(
    actions.toggleElmVisibility,
    (state, { payload: elm }): TGameDetailedReducer => {
      return produce(state, (draft) => {
        draft.uploadableElms[elm].show = !draft.uploadableElms[elm].show;
      });
    }
  )
  .handleAction(actions.setIsOwned, (state, { payload }): TGameDetailedReducer => ({ ...state, isOwned: payload }))
  .handleAction(actions.setIsWished, (state, { payload }): TGameDetailedReducer => ({ ...state, isWished: payload }))
  .handleAction(
    actions.setShowOwnedNotifier,
    (state, { payload }): TGameDetailedReducer => ({ ...state, showOwnedNotifier: payload })
  )
  .handleAction(
    actions.setShowWisListWarn,
    (state, { payload }): TGameDetailedReducer => ({ ...state, showWishListWarn: payload })
  )
  .handleAction(
    actions.setShowWishNotifier,
    (state, { payload }): TGameDetailedReducer => ({ ...state, showWishNotifier: payload })
  )
  .handleAction(
    actions.setEbaySectionLoading,
    (state, { payload }): TGameDetailedReducer => {
      return produce(state, (draft) => {
        draft.uploadableElms.ebaySection.isLoading = payload;
      });
    }
  )
  .handleAction(actions.flushGameDetailed, (): TGameDetailedReducer => initial);
