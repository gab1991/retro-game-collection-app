import { IShowCornerNotifier, IShowErrorModal, IShowInfoModal, TView } from 'Store/appStateReducer/types';
import { TSelector } from 'Store/types';

export const selectErrorModal: TSelector<IShowErrorModal> = (state) => state.appState.showErrorModal;

export const selectInfoModal: TSelector<IShowInfoModal> = (state) => state.appState.showInfoModal;

export const selectAuthModalShowState: TSelector<boolean> = (state) => state.appState.showAuthModal;

export const selectCornerNotifier: TSelector<IShowCornerNotifier> = (state) => state.appState.showCornerNotifier;

export const selectIsMobile: TSelector<boolean> = (state) => state.appState.currentView === 'mobile';

export const selectCurrenView: TSelector<TView> = (state) => state.appState.currentView;
