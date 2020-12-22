import { EAppStateActions } from '../Actions/appStateActions';

interface IAppStateReducer {
  isMobile: boolean;
  showAuthModal: boolean;
  showCornerNotifier: boolean;
  showErrorModal: boolean;
  showInfoModal: boolean;
}

const initial: IAppStateReducer = {
  isMobile: false,
  showAuthModal: false,
  showCornerNotifier: false,
  showErrorModal: false,
  showInfoModal: false,
};

export const appStateReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case EAppStateActions.SET_IS_MOBILE:
      return { ...state, isMobile: payload };
    case EAppStateActions.SHOW_ERR_MODAL:
      return { ...state, showErrorModal: payload };
    case EAppStateActions.SHOW_INFO_MODAL:
      return { ...state, showErrorModal: payload };
    case EAppStateActions.SHOW_AUTH_MODAL:
      return { ...state, showAuthModal: payload };
    case EAppStateActions.SHOW_CORNER_NOTIFIER:
      return { ...state, showCornerNotifier: payload };

    default:
      return state;
  }
};
