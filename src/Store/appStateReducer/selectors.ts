import { TSelector } from 'Store/types';

export const selectErrorModalShowState: TSelector<boolean> = (state) => state.appState.showErrorModal.show;

export const selectInfoMoadlShowState: TSelector<boolean> = (state) => state.appState.showInfoModal.show;

export const selectAuthModalShowState: TSelector<boolean> = (state) => state.appState.showAuthModal;

export const selectCornerNotifierShowState: TSelector<boolean> = (state) => state.appState.showCornerNotifier.show;

export const selectIsMobile: TSelector<boolean> = (state) => state.appState.isMobile;
