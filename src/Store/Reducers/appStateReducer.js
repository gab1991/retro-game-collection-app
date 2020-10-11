import {
  SET_IS_MOBILE,
  SHOW_ERR_MODAL,
  SHOW_INFO_MODAL,
  SHOW_AUTH_MODAL,
  SHOW_CORNER_NOTIFIER,
} from '../Actions/appStateActions';

const initial = {
  isMobile: false,
  showAuthModal: false,
  showCornerNotifier: false,
  showErrorModal: false,
  showInfoModal: false,
};

const appStateReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case SET_IS_MOBILE:
      return { ...state, isMobile: payload };
    case SHOW_ERR_MODAL:
      return { ...state, showErrorModal: payload };
    case SHOW_INFO_MODAL:
      return { ...state, showErrorModal: payload };
    case SHOW_AUTH_MODAL:
      return { ...state, showAuthModal: payload };
    case SHOW_CORNER_NOTIFIER:
      return { ...state, showCornerNotifier: payload };

    default:
      return state;
  }
};

export default appStateReducer;
