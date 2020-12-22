import { TActionCreator } from '../types';

import { ICornerNotifierProps, IErrorModalProps, IInfoModalProps } from 'Components/UI/Modals';

export enum EAppStateActions {
  SET_IS_MOBILE = 'SET_IS_MOBILE',
  SHOW_ERR_MODAL = 'SHOW_ERR_MODAL',
  SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL',
  SHOW_INFO_MODAL = 'SHOW_INFO_MODAL',
  SHOW_CORNER_NOTIFIER = 'SHOW_CORNER_NOTIFIER',
}

export const setIsMobile: TActionCreator<[boolean], boolean> = (value) => ({
  type: EAppStateActions.SET_IS_MOBILE,
  payload: value,
});

export const showErrModal: TActionCreator<[IErrorModalProps], IErrorModalProps> = (modalProps) => ({
  type: EAppStateActions.SHOW_ERR_MODAL,
  payload: { ...modalProps },
});

export const hideErrModal: TActionCreator<[], boolean> = () => ({
  type: EAppStateActions.SHOW_ERR_MODAL,
  payload: false,
});

export const showAuthModal: TActionCreator<[boolean], boolean> = (bool) => ({
  type: EAppStateActions.SHOW_AUTH_MODAL,
  payload: bool,
});

export const showInfoModal: TActionCreator<[IInfoModalProps], IInfoModalProps> = (modalProps) => ({
  type: EAppStateActions.SHOW_INFO_MODAL,
  payload: { ...modalProps },
});

export const hideInfoModal: TActionCreator<[], boolean> = () => ({
  type: EAppStateActions.SHOW_INFO_MODAL,
  payload: false,
});

export const showCornerNotifier: TActionCreator<[ICornerNotifierProps], ICornerNotifierProps> = (modalProps) => ({
  type: EAppStateActions.SHOW_CORNER_NOTIFIER,
  payload: { ...modalProps },
});

export const hideCornerNotifier: TActionCreator<[], boolean> = () => ({
  type: EAppStateActions.SHOW_CORNER_NOTIFIER,
  payload: false,
});
