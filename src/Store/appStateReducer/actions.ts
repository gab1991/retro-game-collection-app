import { TActionCreator } from '../types';
import { EAppStateActions } from './types';
import { createAction } from 'typesafe-actions';

import { ICornerNotifierProps, IErrorModalProps, IInfoModalProps } from 'Components/UI/Modals';

export const setIsMobile = createAction(EAppStateActions.SET_IS_MOBILE, (value: boolean) => value)();

export const showErrModal = createAction('appState/showErrModal', (modalProps: IErrorModalProps) => modalProps)();

export const hideErrModal = createAction('appState/hideErrorModal')();

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
