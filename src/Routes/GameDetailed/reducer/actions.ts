import { EVideoType, TToggleableEmls } from './types';
import { createAction } from 'typesafe-actions';

import { IRawgGameDetails } from 'Typings/rawgData';

export const setGameDetails = createAction('gameDetailed/setGameDetails')<IRawgGameDetails>();

export const setDescriptionHtml = createAction('gameDetailed/setDescriptionHtml', (html) => html)();

export const setScreenshots = createAction(
  'gameDetailed/setScreenshots',
  (screenshots: Array<string>) => screenshots
)();

export const setVideoUrl = createAction('gameDetailed/setVideoUrl', (type: EVideoType, url: string) => ({
  type,
  url,
}))();

export const toggleElmVisibility = createAction('gameDetailed/toggleElmVisibility', (elm: TToggleableEmls) => elm)();

export const setIsOwned = createAction('gameDetailed/setIsOwned', (bool: boolean) => bool)();

export const setIsWished = createAction('gameDetailed/setIsWished', (bool: boolean) => bool)();

export const setShowOwnedNotifier = createAction('gameDetailed/setShowOwnedNotifier', (bool: boolean) => bool)();

export const setShowWishNotifier = createAction('gameDetailed/setShowWishNotifier', (bool: boolean) => bool)();

export const setShowWisListWarn = createAction('gameDetailed/setShowWisListWarn', (bool: boolean) => bool)();

export const setEbaySectionLoading = createAction('gameDetailed/setEbaySectionLoading', (bool: boolean) => bool)();

export const flushGameDetailed = createAction('gameDetailed/flush')();
