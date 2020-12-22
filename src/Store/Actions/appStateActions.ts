import { TBaseAction } from '../types';

import { ICornerNotifierProps, IErrorModalProps, IInfoModalProps } from 'Components/UI/Modals';

export enum EAppStateActions {
  SET_IS_MOBILE = 'SET_IS_MOBILE',
  SHOW_ERR_MODAL = 'SHOW_ERR_MODAL',
  SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL',
  SHOW_INFO_MODAL = 'SHOW_INFO_MODAL',
  SHOW_CORNER_NOTIFIER = 'SHOW_CORNER_NOTIFIER',
}

export const setIsMobile: TBaseAction<[boolean], boolean> = (value) => ({
  type: EAppStateActions.SET_IS_MOBILE,
  payload: value,
});

export const showErrModal: TBaseAction<[IErrorModalProps], IErrorModalProps> = (modalProps) => ({
  type: EAppStateActions.SHOW_ERR_MODAL,
  payload: { ...modalProps },
});

export const hideErrModal: TBaseAction<[], boolean> = () => ({
  type: EAppStateActions.SHOW_ERR_MODAL,
  payload: false,
});

export const showAuthModal: TBaseAction<[boolean], boolean> = (bool) => ({
  type: EAppStateActions.SHOW_AUTH_MODAL,
  payload: bool,
});

export const showInfoModal: TBaseAction<[IInfoModalProps], IInfoModalProps> = (modalProps) => ({
  type: EAppStateActions.SHOW_INFO_MODAL,
  payload: { ...modalProps },
});

export const hideInfoModal: TBaseAction<[], boolean> = () => ({
  type: EAppStateActions.SHOW_INFO_MODAL,
  payload: false,
});

export const showCornerNotifier: TBaseAction<[ICornerNotifierProps], ICornerNotifierProps> = (modalProps) => ({
  type: EAppStateActions.SHOW_CORNER_NOTIFIER,
  payload: { ...modalProps },
});

export const hideCornerNotifier: TBaseAction<[], boolean> = () => ({
  type: EAppStateActions.SHOW_CORNER_NOTIFIER,
  payload: false,
});
