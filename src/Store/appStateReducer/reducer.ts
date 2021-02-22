import { TAppStateActions, TAppStateReducer } from './types';
import { createReducer } from 'typesafe-actions';

import * as actions from './actions';

const initial: TAppStateReducer = {
  isMobile: false,
  showAuthModal: false,
  showCornerNotifier: { show: false },
  showErrorModal: { show: false },
  showInfoModal: { show: false },
};

export const appStateReducer = createReducer<TAppStateReducer, TAppStateActions>(initial)
  .handleAction(actions.setIsMobile, (state, { payload }): TAppStateReducer => ({ ...state, isMobile: payload }))
  .handleAction(
    actions.showErrModal,
    (state, { payload: modalProps }): TAppStateReducer => ({
      ...state,
      showErrorModal: { show: true, ...modalProps },
    })
  )
  .handleAction(
    actions.hideErrModal,
    (state): TAppStateReducer => ({
      ...state,
      showErrorModal: { show: false },
    })
  )
  .handleAction(
    actions.showAuthModal,
    (state, { payload }): TAppStateReducer => ({
      ...state,
      showAuthModal: payload,
    })
  )
  .handleAction(
    actions.showInfoModal,
    (state, { payload: modalProps }): TAppStateReducer => ({
      ...state,
      showInfoModal: { show: true, ...modalProps },
    })
  )
  .handleAction(
    actions.hideInfoModal,
    (state): TAppStateReducer => ({
      ...state,
      showInfoModal: { show: false },
    })
  )
  .handleAction(
    actions.showCornerNotifier,
    (state, { payload: modalProps }): TAppStateReducer => ({
      ...state,
      showCornerNotifier: { ...modalProps, show: true },
    })
  )
  .handleAction(
    actions.hideCornerNotifier,
    (state): TAppStateReducer => ({
      ...state,
      showCornerNotifier: { show: false },
    })
  );
