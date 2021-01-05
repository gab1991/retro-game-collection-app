import { IProfile } from './types';
import { createAction } from 'typesafe-actions';

export const fillProfile = createAction('profile/fillProfile', (profile: IProfile) => profile)();
