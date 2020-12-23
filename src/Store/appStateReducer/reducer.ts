import { EAppStateActions, TAppStateActions, TAppStateReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

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
  .handleAction(actions.setIsMobile, (state, { payload }) => ({ ...state, isMobile: payload }))
  .handleAction(actions.showErrModal, (state, { payload: modalProps }) => ({
    ...state,
    showErrorModal: { show: true, ...modalProps },
  }))
  .handleAction(actions.hideErrModal, (state) => ({
    ...state,
    showErrorModal: { show: false },
  }));
