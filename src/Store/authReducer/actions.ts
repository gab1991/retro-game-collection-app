import { createAction } from 'typesafe-actions';

import { storageHandler } from 'Utils/localStorage';

export const signIn = createAction('auth/signIn', (username: string, token: string) => {
  storageHandler.setItems([
    ['username', username],
    ['token', token],
  ]);
  return { token, username };
})();

export const logOut = createAction('auth/logOut')();
