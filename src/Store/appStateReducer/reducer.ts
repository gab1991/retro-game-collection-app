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
  .handleAction(actions.setIsMobile, (state, { payload }) => ({ ...state, isMobile: payload }))
  .handleAction(actions.showErrModal, (state, { payload: modalProps }) => ({
    ...state,
    showErrorModal: { show: true, ...modalProps },
  }))
  .handleAction(actions.hideErrModal, (state) => ({
    ...state,
    showErrorModal: { show: false },
  }))
  .handleAction(actions.showAuthModal, (state, { payload }) => ({
    ...state,
    showAuthModal: payload,
  }))
  .handleAction(actions.showInfoModal, (state, { payload: modalProps }) => ({
    ...state,
    showInfoModal: { show: true, ...modalProps },
  }))
  .handleAction(actions.hideInfoModal, (state) => ({
    ...state,
    showInfoModal: { show: false },
  }))
  .handleAction(actions.showCornerNotifier, (state, { payload: modalProps }) => ({
    ...state,
    showCornerNotifier: { show: true, ...modalProps },
  }))
  .handleAction(actions.hideCornerNotifier, (state) => ({
    ...state,
    showCornerNotifier: { show: false },
  }));
