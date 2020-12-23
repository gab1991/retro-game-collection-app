import { IRootState } from 'Store/types';

export const getShowErrorModal = (state: IRootState): boolean => state.appState.showErrorModal.show;
