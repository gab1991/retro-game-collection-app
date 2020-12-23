import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { ICornerNotifierProps, IErrorModalProps, IInfoModalProps } from 'Components/UI/Modals';

import * as appStateActions from './actions';

export enum EAppStateActions {
  SET_IS_MOBILE = 'SET_IS_MOBILE',
  SHOW_ERR_MODAL = 'SHOW_ERR_MODAL',
  SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL',
  SHOW_INFO_MODAL = 'SHOW_INFO_MODAL',
  SHOW_CORNER_NOTIFIER = 'SHOW_CORNER_NOTIFIER',
}

export type TAppStateActions = ActionType<typeof appStateActions>;

export interface IShowErrorModal extends IErrorModalProps {
  show: boolean;
}

export type TAppStateReducer = DeepReadonly<{
  isMobile: boolean;
  showAuthModal: boolean;
  showCornerNotifier: boolean;
  showErrorModal: IShowErrorModal;
  showInfoModal: boolean;
}>;
