import { TGameDetailedReducer, TUploadableEmls } from './types';
import { TSelector } from 'Store/types';

import { IRawgGameDetails } from 'Typings/rawgData';

export const selectGameDetailed: TSelector<TGameDetailedReducer> = (state) => state.gameDetailed;

export const selectScreenshots: TSelector<Array<string>> = (state) => state.gameDetailed.screenshots;

export const selectIsWished: TSelector<boolean> = (state) => state.gameDetailed.isWished;

export const selectIsOwned: TSelector<boolean> = (state) => state.gameDetailed.isOwned;

export const selectGameDetails: TSelector<IRawgGameDetails | null> = (state) => state.gameDetailed.gameDetails;

export const selectVideos: TSelector<Omit<TUploadableEmls, 'ebaySection'>> = (state) => {
  const { gameplayVideo, soundtrackVideo } = state.gameDetailed.uploadableElms;
  return { gameplayVideo, soundtrackVideo };
};

export const selectEbaySection: TSelector<Pick<TUploadableEmls, 'ebaySection'>> = (state) => {
  const { ebaySection } = state.gameDetailed.uploadableElms;
  return { ebaySection };
};
