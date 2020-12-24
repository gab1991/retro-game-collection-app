import { ActionType } from 'typesafe-actions';
import { DeepReadonly } from 'utility-types';

import { ICornerNotifierProps, IErrorModalProps, IInfoModalProps } from 'Components/UI/Modals';

import * as appStateActions from './actions';

export type TAppStateActions = ActionType<typeof appStateActions>;

export interface IShowErrorModal extends IErrorModalProps {
  show: boolean;
}

export interface IShowInfoModal extends IInfoModalProps {
  show: boolean;
}

export interface IShowCornerNotifier extends ICornerNotifierProps {
  show: boolean;
}

export type TAppStateReducer = DeepReadonly<{
  isMobile: boolean;
  showAuthModal: boolean;
  showCornerNotifier: IShowCornerNotifier;
  showErrorModal: IShowErrorModal;
  showInfoModal: IShowInfoModal;
}>;
