import { TEbayItemsActions, TEbayItemsReducer } from './types';
import { createReducer } from 'typesafe-actions';

const initial: TEbayItemsReducer = {};

export const ebayItemsReducer = createReducer<TEbayItemsReducer, TEbayItemsActions>(initial);
