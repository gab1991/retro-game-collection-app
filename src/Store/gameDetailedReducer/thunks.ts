import { batch } from 'react-redux';
import { Backend } from 'Backend';

import { EVideoType } from './types';
import { TThunk } from 'Store/types';

import { EAvailableLists, TPlatformNames } from 'Configs/appConfig';
import { addGame as addGameTopProfile } from 'Store/Actions/profileActions';
import { showErrModal } from 'Store/appStateReducer/actions';
import { getEbayItems as getEbayItemsCore } from 'Store/ebayItemsReducer/thunks';
import { IRawgGameDetails } from 'Typings/RawgData';

import {
  setDescriptionParsed,
  setEbaySectionLoading,
  setGameDetails,
  setScreenshots,
  setShowOwnedNotifier,
  setShowWishNotifier,
  setShowWisListWarn,
  setVideoUrl,
} from './actions';

const ADD_GAME_NOTIFIER_SHOWTIME = 2000;

export const getGameDetails = (slug: string): TThunk => {
  return async (dispatch) => {
    const { data: gameDetails } = await Backend.getGameDetails(slug, () =>
      //error handling cb
      dispatch(showErrModal({ message: 'Something wrong happens! Try again later' }))
    );

    if (!gameDetails) return;

    batch(() => {
      dispatch(setGameDetails(gameDetails));
      dispatch(setDescriptionParsed(gameDetails.description));
    });
  };
};

export const getScreenShots = (slug: string): TThunk => {
  return async (dispatch) => {
    const { data: { results } = { results: [] } } = await Backend.getScreenshots(slug, () => {
      dispatch(
        showErrModal({
          message: `Couldnt fetch screenshots.Try again if you wish`,
        })
      );
    });
    const screenshotsUrls: Array<string> = [];

    results.forEach((obj) => screenshotsUrls.push(obj.image));
    dispatch(setScreenshots(screenshotsUrls));
  };
};

export const getVideo = (type: EVideoType, platform: TPlatformNames, game: string): TThunk => {
  return async (dispatch) => {
    const { data: url = null } = await Backend.getVideo(type, platform, game);
    if (!url) return;

    const combinedUrl = `https://www.youtube.com/watch?v=${url}`;
    dispatch(setVideoUrl(type, combinedUrl));
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
  return async (dispatch, getState) => {
    dispatch(addGameTopProfile(gameDetails, list, platform));
    const {
      gameDetailed: { isWished },
    } = getState();

    if (list === EAvailableLists.wishList) {
      dispatch(showWishedNotifierForTime(ADD_GAME_NOTIFIER_SHOWTIME));
    } else if (list === EAvailableLists.ownedList) {
      isWished ? dispatch(setShowWisListWarn(true)) : dispatch(showOwnedNotifierForTime(ADD_GAME_NOTIFIER_SHOWTIME));
    }
  };
};

export const getEbayItems = (platform: TPlatformNames, game: string, sortOrder: string): TThunk => {
  return async (dispatch) => {
    dispatch(setEbaySectionLoading(true));
    dispatch(getEbayItemsCore(platform, game, sortOrder));
    dispatch(setEbaySectionLoading(false));
  };
};
