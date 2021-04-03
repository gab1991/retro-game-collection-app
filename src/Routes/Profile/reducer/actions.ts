import { IProfile, IReorderGamesActionArgs } from './types';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const fillProfile = createAction('profile/fillProfile', (profile: IProfile) => profile)();

export const flushProfile = createAction('profile/flushProfile')();

export const reorderGames = createAsyncAction(
  'profile/flushProfile/request',
  'profile/flushProfile/success',
  'profile/flushProfile/failure'
)<IReorderGamesActionArgs, IReorderGamesActionArgs, IReorderGamesActionArgs>();
