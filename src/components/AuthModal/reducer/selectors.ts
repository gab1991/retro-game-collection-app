import { TSelector } from 'Store/types';

export const selectIsSending: TSelector<boolean> = (state) => state.authModal.isSending;
