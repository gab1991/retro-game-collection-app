import {
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
} from '../Actions/gameDetailedActions';

const initial = {
  isOwned: false,
  isWished: false,
  screenshots: [],
  descriptionParsed: null,
  gameDetails: {},
  boxArtUrl: '',
  uploadableElms: {
    soundtrackVideo: { show: false, url: '' },
    gameplayVideo: { show: false, url: '' },
    ebaySection: { show: true, isLoading: true },
  },
  showOwnedNotifier: false,
  showWishNotifier: false,
  showWishListWarn: false,
};

const gameDetailedReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case SET_GAME_DETAILS:
      return { ...state, gameDetails: payload };
    case SET_SCREENSHOTS:
      return { ...state, screenshots: payload };
    case SET_DESCRIPTION_PARSED:
      return { ...state, descriptionParsed: payload };
    case SET_VIDEO_URL: {
      const { type, url } = payload;
      const newUploadble = { ...state.uploadableElms };

      if (type === 'soundtrack') {
        newUploadble.soundtrackVideo = {
          ...newUploadble.soundtrackVideo,
          url,
        };
      }
      if (type === 'gameplay') {
        newUploadble.gameplayVideo = {
          ...newUploadble.gameplayVideo,
          url,
        };
      }
      return { ...state, uploadableElms: newUploadble };
    }
    case TOGGLE_ELM_VISIBILITY: {
      const elm = payload;
      const newUploadble = { ...state.uploadableElms };
      newUploadble[elm] = {
        ...newUploadble[elm],
        show: !newUploadble[elm].show,
      };
      return { ...state, uploadableElms: newUploadble };
    }
    case SET_IS_OWNED:
      return { ...state, isOwned: payload };
    case SET_IS_WISHED:
      return { ...state, isWished: payload };
    case SET_SHOW_OWNED_NOTIFIER:
      return { ...state, showOwnedNotifier: payload };
    case SET_SHOW_WISH_NOTIFIER:
      return { ...state, showWishNotifier: payload };
    case SET_SHOW_WISH_LIST_WARNING:
      return { ...state, showWishListWarn: payload };
    case SET_EBAY_SECTION_LOADING: {
      return {
        ...state,
        uploadableElms: {
          ...state.uploadableElms,
          ebaySection: {
            ...state.uploadableElms.ebaySection,
            isLoading: payload,
          },
        },
      };
    }
    case FLUSH_GAME_DETAILED:
      return initial;
    default:
      return state;
  }
};

export default gameDetailedReducer;
