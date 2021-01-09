/* eslint-disable import/no-default-export, @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention  */

import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export {};
