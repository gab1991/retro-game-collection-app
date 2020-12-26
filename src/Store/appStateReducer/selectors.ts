import { IRootState } from 'Store/types';

export const getErrorModalShowState = (state: IRootState): boolean => state.appState.showErrorModal.show;

export const getInfoMoadlShowState = (state: IRootState): boolean => state.appState.showInfoModal.show;

export const getShowAuthModalState = (state: IRootState): boolean => state.appState.showAuthModal;

export const getCornerNotifierShowState = (state: IRootState): boolean => state.appState.showCornerNotifier.show;
