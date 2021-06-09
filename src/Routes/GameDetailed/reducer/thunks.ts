import { batch } from 'react-redux';
import { api } from 'Api';

import { EVideoType } from './types';
import { EEbaySortOrder } from 'Api/types';
import { TThunk } from 'Store/types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { addGame as addGameTopProfile } from 'Routes/Profile/reducer/thunks';
import { showErrModal } from 'Store/appStateReducer/actions';
import { getEbayItemsThunk } from 'Store/ebayItemsReducer/thunks';
import { IRawgGameDetails } from 'Typings/RawgData';

import {
  setDescriptionHtml,
  setEbaySectionLoading,
  setGameDetails,
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
      const { data: gameDetails } = await api.getGameDetails(slug);
      batch(() => {
        dispatch(setGameDetails(gameDetails));
        dispatch(setDescriptionHtml(gameDetails.description));
      });
    } catch (err) {
      dispatch(showErrModal({ message: 'Something wrong happens! Try again later' }));
    }
  };
};

export const getScreenShots = (slug: string): TThunk => {
  return async (dispatch) => {
    try {
      const { data: { results } = { results: [] } } = await api.getScreenshots(slug);

      const screenshotsUrls: Array<string> = [];

      results.forEach((obj) => screenshotsUrls.push(obj.image));
      dispatch(setScreenshots(screenshotsUrls));
    } catch (err) {
      dispatch(
        showErrModal({
          message: `Couldnt fetch screenshots.Try again if you wish`,
        })
      );
    }
  };
};

export const getVideo = (type: EVideoType, platform: TPlatformNames, game: string): TThunk => {
  return async (dispatch) => {
    try {
      const { data: url } = await api.getVideo(type, platform, game);
      const combinedUrl = `https://www.youtube.com/watch?v=${url}`;
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

export const addGame = (gameDetails: IRawgGameDetails, list: EAvailableLists, platform: TPlatformNames): TThunk => {
  return async (dispatch, getStore) => {
    const store = getStore();
    const isWished = selectIsWished(store);

    dispatch(addGameTopProfile(gameDetails, list, platform));

    if (list === EAvailableLists.wishList) {
      dispatch(showWishedNotifierForTime(ADD_GAME_NOTIFIER_SHOWTIME));
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
