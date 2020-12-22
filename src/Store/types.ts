import { EAppStateActions } from './Actions/appStateActions';

type TCombinedTypes = EAppStateActions;
export interface IAction<T> {
  type: TCombinedTypes;
  payload?: T;
}

export type TBaseAction<P extends Array<unknown>, T> = (...args: P) => IAction<T>;
