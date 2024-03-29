import { batch } from 'react-redux';
import { profileApi } from 'Api';

import { EVideoType } from './types';
import { EEbaySortOrder, IAddGame } from 'Api/types';
import { TThunk } from 'Store/types';

import { rawgApi } from 'Api/rawgApi';
import { youtubeApi } from 'Api/youtubeApi';
import { appConfig, EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { fillProfile } from 'Routes/Profile/reducer/actions';
import { showErrModal } from 'Store/appStateReducer/actions';
import { getEbayItemsThunk } from 'Store/ebayItemsReducer/thunks';

import {
  setDescriptionHtml,
  setEbaySectionLoading,
  setGameDetails,
  setIsWished,
  setScreenshots,
  setShowOwnedNotifier,
  setShowWishNotifier,
  setShowWisListWarn,
  setVideoUrl,
} from './actions';
import { selectIsWished } from './selectors';

const ADD_GAME_NOTIFIER_SHOWTIME = 2000;

export const getGameDetails = (slug: string): TThunk => {
  return async (dispatch) => {
    try {
      const {
        data: { payload },
      } = await rawgApi.getGameDetails(slug);

      if (!payload) {
        throw new Error('cannot get payload');
      }

      batch(() => {
        dispatch(setGameDetails(payload));
        dispatch(setDescriptionHtml(payload.description));
      });
    } catch (err) {
      dispatch(showErrModal({ message: 'Something wrong happens! Try again later' }));
    }
  };
};

export const getScreenShots = (slug: string): TThunk => {
  return async (dispatch) => {
    try {
      const {
        data: { payload },
      } = await rawgApi.getScreenshots(slug);

      if (!payload) {
        throw new Error('no payload');
      }

      const screenshotsUrls: Array<string> = [];

      payload.results.forEach((obj) => screenshotsUrls.push(obj.image));
      dispatch(setScreenshots(screenshotsUrls));
    } catch (err) {
      dispatch(
        showErrModal({
          message: `Sorry.We couldnt fetch screenshots, server is probably unavailable`,
        })
      );
    }
  };
};

export const getVideo = (type: EVideoType, platform: TPlatformNames, game: string): TThunk => {
  return async (dispatch) => {
    try {
      const {
        data: { payload },
      } = await youtubeApi.getVideo(type, platform, game);

      if (!payload) {
        throw new Error('no payload');
      }

      const combinedUrl = `https://www.youtube.com/watch?v=${payload}`;
      dispatch(setVideoUrl(type, combinedUrl));
    } catch (error) {}
  };
};

export const showOwnedNotifierForTime = (time: number): TThunk => {
  return (dispatch) => {
    dispatch(setShowOwnedNotifier(true));
    setTimeout(() => {
      dispatch(setShowOwnedNotifier(false));
    }, time);
  };
};

export const showWishedNotifierForTime = (time: number): TThunk => {
  return (dispatch) => {
    dispatch(setShowWishNotifier(true));
    setTimeout(() => {
      dispatch(setShowWishNotifier(false));
    }, time);
  };
};

export const addGame = (data: IAddGame): TThunk => {
  return async (dispatch, getStore) => {
    const store = getStore();
    const isWished = selectIsWished(store);

    try {
      await profileApi.addGame({
        ...data,
      });
    } catch (err) {
      return dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }

    if (data.list === EAvailableLists.wishList) {
      batch(() => {
        dispatch(showWishedNotifierForTime(ADD_GAME_NOTIFIER_SHOWTIME));
        dispatch(setIsWished(!isWished));
      });
    } else if (data.list === EAvailableLists.ownedList) {
      isWished ? dispatch(setShowWisListWarn(true)) : dispatch(showOwnedNotifierForTime(ADD_GAME_NOTIFIER_SHOWTIME));
    }
  };
};

export const removeGame = (gameName: string, list: EAvailableLists, platform: TPlatformNames): TThunk => {
  return async (dispatch, getStore) => {
    const store = getStore();
    const isWished = selectIsWished(store);

    try {
      const {
        data: { payload },
      } = await profileApi.removeGame({
        game: gameName,
        list,
        platform,
      });

      if (payload) dispatch(fillProfile(payload));
    } catch (err) {
      return dispatch(
        showErrModal({
          message: appConfig.defaultApiErr,
        })
      );
    }

    if (list === EAvailableLists.wishList) {
      dispatch(setIsWished(!isWished));
    } else if (list === EAvailableLists.ownedList) {
      isWished ? dispatch(setShowWisListWarn(true)) : dispatch(showOwnedNotifierForTime(ADD_GAME_NOTIFIER_SHOWTIME));
    }
  };
};

export const getEbayItemsGDThunk = (platform: TPlatformNames, game: string, sortOrder: EEbaySortOrder): TThunk => {
  return async (dispatch) => {
    dispatch(setEbaySectionLoading(true));
    dispatch(getEbayItemsThunk(platform, game, sortOrder));
  };
};
