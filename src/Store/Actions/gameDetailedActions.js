import ReactHtmlParser from 'react-html-parser';
import Backend from '../../Backend/Backend';
import { showErrModal } from '../Actions/modalActions';

const setGameDetails = (gameDetailsObj) => {
  return {
    type: 'SET_GAME_DETAILS',
    payload: gameDetailsObj,
  };
};

const setDescriptionParsed = (html) => {
  return {
    type: 'SET_DESCRIPTION_PARSED',
    payload: ReactHtmlParser(html),
  };
};

const setScreenshots = (screenshots) => {
  return {
    type: 'SET_SCREENSHOTS',
    payload: screenshots,
  };
};

const setBoxArtUrl = (url) => {
  return {
    type: 'SET_BOX_ART_URL',
    payload: url,
  };
};

const setVideoUrl = (type, url) => {
  return {
    type: 'SET_VIDEO_URL',
    payload: { type, url },
  };
};

const getGameDetails = (slug) => {
  return async (dispatch) => {
    try {
      const { data: gameDetails } = await Backend.getGameDetails(slug);
      dispatch(setGameDetails(gameDetails));
      dispatch(setDescriptionParsed(gameDetails.description));
    } catch (err) {
      // need to add error handling;
    }
  };
};

const getScreenShots = (slug) => {
  return async (dispatch) => {
    try {
      const { data } = await Backend.getScreenshots(slug);
      const screenshotsUrls = [];

      data.results.forEach((obj) => screenshotsUrls.push(obj.image));
      dispatch(setScreenshots(screenshotsUrls));
    } catch (err) {
      // need to add error handling;
    }
  };
};

const getBoxArt = (platformName, gameName) => {
  return async (dispatch) => {
    try {
      const { data: boxArtUrl } = await Backend.getBoxArt(
        platformName,
        gameName
      );
      dispatch(setBoxArtUrl(boxArtUrl));
    } catch (err) {
      // need to add error handling;
    }
  };
};

const getVideo = (type, platformName, gameName) => {
  return async (dispatch) => {
    try {
      const { data: url } = await Backend.getVideo(
        type,
        platformName,
        gameName
      );
      const combinedUrl = `https://www.youtube.com/watch?v=${url}`;
      dispatch(setVideoUrl(type, combinedUrl));
    } catch (err) {
      // need to add error handling;
    }
  };
};

const toggleElmVisibility = (elm) => {
  return {
    type: 'TOGGLE_ELM_VISIBILITY',
    payload: elm,
  };
};

const setIsOwned = (bool) => {
  return {
    type: 'SET_IS_OWNED',
    payload: bool,
  };
};

const setIsWished = (bool) => {
  return {
    type: 'SET_IS_WISHED',
    payload: bool,
  };
};

const setShowOwnedNotifier = (bool) => {
  return {
    type: 'SET_SHOW_OWNED_NOTIFIER',
    payload: bool,
  };
};

const setShowWishNotifier = (bool) => {
  return {
    type: 'SET_SHOW_WISH_NOTIFIER',
    payload: bool,
  };
};

const setShowWisListWarn = (bool) => {
  return {
    type: 'SET_SHOW_WISH_LIST_WARNING',
    payload: bool,
  };
};

const showOwnedNotifierForTime = (bool, time) => {
  return (dispatch) => {
    dispatch(setShowOwnedNotifier(true));
    setTimeout(() => {
      dispatch(setShowOwnedNotifier(false));
    }, time);
  };
};

const showWishedNotifierForTime = (bool, time) => {
  return (dispatch) => {
    dispatch(setShowWishNotifier(true));
    setTimeout(() => {
      dispatch(setShowWishNotifier(false));
    }, time);
  };
};

const removeGame = (gameDetails, list, platform) => {
  return async (dispatch, getState) => {
    const {
      logged: { token },
    } = getState();
    try {
      const res = await Backend.updateProfile(token, {
        action: 'removeGame',
        list,
        platform,
        game: gameDetails,
      });
    } catch (err) {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const addGame = (gameDetails, list, platform) => {
  return async (dispatch, getState) => {
    const {
      logged: { token },
      gameDetailed: { isWished },
    } = getState();
    try {
      await Backend.updateProfile(token, {
        action: 'addGame',
        list,
        platform,
        game: gameDetails,
      });
      if (list === 'wish_list') {
        dispatch(showWishedNotifierForTime(true, 2000));
      } else if (list === 'owned_list') {
        isWished
          ? dispatch(setShowWisListWarn(true))
          : dispatch(showOwnedNotifierForTime(true, 2000));
      }
    } catch (err) {
      dispatch(
        showErrModal({
          message: 'Something wrong happened.Try again later',
        })
      );
    }
  };
};

const setEbaySectionLoading = (bool) => {
  return {
    type: 'SET_EBAY_SECTION_LOADING',
    payload: bool,
  };
};

const setEbayItems = (items) => {
  return {
    type: 'SET_EBAY_ITEMS',
    payload: items,
  };
};

const getEbayItems = (platform, game) => {
  return async (dispatch) => {
    try {
      dispatch(setEbaySectionLoading(true));

      const [res] = await Backend.getEbayItems(platform, game);
      const { item: items } = res;

      dispatch(setEbayItems(items));
      dispatch(setEbaySectionLoading(false));
    } catch (err) {
      dispatch(setEbaySectionLoading(false));
    }
  };
};

export {
  getGameDetails,
  getScreenShots,
  getBoxArt,
  getVideo,
  toggleElmVisibility,
  setIsOwned,
  setIsWished,
  removeGame,
  addGame,
  setShowWisListWarn,
  getEbayItems,
};
