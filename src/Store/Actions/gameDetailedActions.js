import ReactHtmlParser from 'react-html-parser';
import Backend from '../../Backend/Backend';
import { addGame as addGameTopProfile } from '../../Store/Actions/profileActions';
import { showErrModal } from './appStateActions';
import { getEbayItems as getEbayItemsCore } from '../Actions/ebayItemsActions';

const SET_GAME_DETAILS = 'SET_GAME_DETAILS';
const SET_DESCRIPTION_PARSED = 'SET_DESCRIPTION_PARSED';
const SET_SCREENSHOTS = 'SET_SCREENSHOTS';
const SET_VIDEO_URL = 'SET_VIDEO_URL';
const TOGGLE_ELM_VISIBILITY = 'TOGGLE_ELM_VISIBILITY';
const SET_IS_OWNED = 'SET_IS_OWNED';
const SET_IS_WISHED = 'SET_IS_WISHED';
const SET_SHOW_OWNED_NOTIFIER = 'SET_SHOW_OWNED_NOTIFIER';
const SET_SHOW_WISH_NOTIFIER = 'SET_SHOW_WISH_NOTIFIER';
const SET_SHOW_WISH_LIST_WARNING = 'SET_SHOW_WISH_LIST_WARNING';
const SET_EBAY_SECTION_LOADING = 'SET_EBAY_SECTION_LOADING';
const FLUSH_GAME_DETAILED = 'FLUSH_GAME_DETAILED';

const setGameDetails = (gameDetailsObj) => {
  return {
    type: SET_GAME_DETAILS,
    payload: gameDetailsObj,
  };
};

const setDescriptionParsed = (html) => {
  return {
    type: SET_DESCRIPTION_PARSED,
    payload: ReactHtmlParser(html),
  };
};

const setScreenshots = (screenshots) => {
  return {
    type: SET_SCREENSHOTS,
    payload: screenshots,
  };
};

const setVideoUrl = (type, url) => {
  return {
    type: SET_VIDEO_URL,
    payload: { type, url },
  };
};

const getGameDetails = (slug) => {
  return async (dispatch) => {
    const { data: gameDetails } = await Backend.getGameDetails(slug, () =>
      //error handling cb
      dispatch(
        showErrModal({ message: 'Something wrong happens! Try again later' })
      )
    );
    if (!gameDetails) return;

    dispatch(setGameDetails(gameDetails));
    dispatch(setDescriptionParsed(gameDetails.description));
  };
};

const getScreenShots = (slug) => {
  return async (dispatch) => {
    const {
      data: { results } = { results: [] },
    } = await Backend.getScreenshots(slug, () => {
      dispatch(
        showErrModal({
          message: `Couldnt fetch screenshots.Try again if you wish`,
        })
      );
    });
    const screenshotsUrls = [];

    results.forEach((obj) => screenshotsUrls.push(obj.image));
    dispatch(setScreenshots(screenshotsUrls));
  };
};

const getVideo = (type, platformName, gameName) => {
  return async (dispatch) => {
    const { data: url = { url: null } } = await Backend.getVideo(
      type,
      platformName,
      gameName
    );
    if (!url) return;

    const combinedUrl = `https://www.youtube.com/watch?v=${url}`;
    dispatch(setVideoUrl(type, combinedUrl));
  };
};

const toggleElmVisibility = (elm) => {
  return {
    type: TOGGLE_ELM_VISIBILITY,
    payload: elm,
  };
};

const setIsOwned = (bool) => {
  return {
    type: SET_IS_OWNED,
    payload: bool,
  };
};

const setIsWished = (bool) => {
  return {
    type: SET_IS_WISHED,
    payload: bool,
  };
};

const setShowOwnedNotifier = (bool) => {
  return {
    type: SET_SHOW_OWNED_NOTIFIER,
    payload: bool,
  };
};

const setShowWishNotifier = (bool) => {
  return {
    type: SET_SHOW_WISH_NOTIFIER,
    payload: bool,
  };
};

const setShowWisListWarn = (bool) => {
  return {
    type: SET_SHOW_WISH_LIST_WARNING,
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

const addGame = (gameDetails, list, platform) => {
  return async (dispatch, getState) => {
    dispatch(addGameTopProfile(gameDetails, list, platform));
    const {
      gameDetailed: { isWished },
    } = getState();

    if (list === 'wish_list') {
      dispatch(showWishedNotifierForTime(true, 2000));
    } else if (list === 'owned_list') {
      isWished
        ? dispatch(setShowWisListWarn(true))
        : dispatch(showOwnedNotifierForTime(true, 2000));
    }
  };
};

const setEbaySectionLoading = (bool) => {
  return {
    type: SET_EBAY_SECTION_LOADING,
    payload: bool,
  };
};

const getEbayItems = (platform, game, sortOrder) => {
  return async (dispatch) => {
    dispatch(setEbaySectionLoading(true));
    console.log('here');
    dispatch(getEbayItemsCore(platform, game, sortOrder));
    console.log('after');
    dispatch(setEbaySectionLoading(false));
  };
};

const flushGameDetailed = () => {
  return {
    type: FLUSH_GAME_DETAILED,
  };
};

export {
  getGameDetails,
  getScreenShots,
  getVideo,
  toggleElmVisibility,
  setIsOwned,
  setIsWished,
  addGame,
  setShowWisListWarn,
  getEbayItems,
  flushGameDetailed,
};

export {
  SET_GAME_DETAILS,
  SET_DESCRIPTION_PARSED,
  SET_SCREENSHOTS,
  SET_VIDEO_URL,
  TOGGLE_ELM_VISIBILITY,
  SET_IS_OWNED,
  SET_IS_WISHED,
  SET_SHOW_OWNED_NOTIFIER,
  SET_SHOW_WISH_NOTIFIER,
  SET_SHOW_WISH_LIST_WARNING,
  SET_EBAY_SECTION_LOADING,
  FLUSH_GAME_DETAILED,
};
