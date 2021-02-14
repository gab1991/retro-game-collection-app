import { TSelector } from 'Store/types';

export const selectLoggedUser: TSelector<string | null> = (state) => state.logged.username;
