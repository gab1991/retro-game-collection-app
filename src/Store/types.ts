import { EAppStateActions } from './Actions/appStateActions';

type TCombinedTypes = EAppStateActions;
interface IAction<P> {
  type: TCombinedTypes;
  payload: P;
}

export type TBaseAction<P extends Array<unknown>, T> = (...args: P) => { type: TCombinedTypes; payload?: T };
