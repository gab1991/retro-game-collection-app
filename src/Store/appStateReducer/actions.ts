import { TView } from './types';
import { createAction } from 'typesafe-actions';

import { ICornerNotifierProps, IErrorModalProps, IInfoModalProps } from 'Components/UI/Modals';

export const showErrModal = createAction('appState/showErrModal', (modalProps: IErrorModalProps) => modalProps)();

export const hideErrModal = createAction('appState/hideErrorModal')();

export const showAuthModal = createAction('appState/showAuthModal', (bool: boolean) => bool)();

export const showInfoModal = createAction('appState/showInfoModal', (modalProps: IInfoModalProps) => modalProps)();

export const hideInfoModal = createAction('appState/hideInfoModal')();

export const showCornerNotifier = createAction(
  'appState/showCornerNotifier',
  (modalProps: ICornerNotifierProps) => modalProps
)();

export const hideCornerNotifier = createAction('appState/hideCornerNotifier')();

export const setCurrentView = createAction('appState/setCurrentView', (view: TView) => view)();
