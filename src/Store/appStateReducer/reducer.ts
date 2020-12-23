import { EAppStateActions, TAppStateActions, TAppStateReducer } from './types';
import { createReducer } from 'typesafe-actions';

const initial: TAppStateReducer = {
  isMobile: false,
  showAuthModal: false,
  showCornerNotifier: false,
  showErrorModal: { show: false },
  showInfoModal: false,
};

// export const appStateReducer = (state = initial, { type, payload }: TAppStateActions): TAppStateReducer => {
//   switch (type) {
//     case EAppStateActions.SET_IS_MOBILE:
//       return { ...state, isMobile: payload };
//     case EAppStateActions.SHOW_ERR_MODAL:
//       return { ...state, showErrorModal: payload };
//     case EAppStateActions.SHOW_INFO_MODAL:
//       return { ...state, showErrorModal: payload };
//     case EAppStateActions.SHOW_AUTH_MODAL:
//       return { ...state, showAuthModal: payload };
//     case EAppStateActions.SHOW_CORNER_NOTIFIER:
//       return { ...state, showCornerNotifier: payload };

//     default:
//       return state;
//   }
// };

export const appStateReducer = createReducer<TAppStateReducer, TAppStateActions>(initial)
  .handleType(EAppStateActions.SET_IS_MOBILE, (state, { payload }) => ({ ...state, isMobile: payload }))
  .handleType(EAppStateActions.SHOW_ERR_MODAL, (state, { payload: modalProps }) => ({
    ...state,
    showErrorModal: { show: true, ...modalProps },
  }));
