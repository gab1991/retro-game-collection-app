import React, { ReactNode, useContext, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { EEbaySortOrder } from 'Api';

import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import { checkIfCardIsWatched, getEbaySingleItemByIndex } from 'Store/ebayItemsReducer/thunks';
import { TEbayCard } from 'Typings/EbayData';

interface IEbayCardContext {
  card: DeepReadonly<TEbayCard> | null;
  itemData: DeepReadonly<TEbayCard['itemData']> | null;
}

export const EbayCardContext = React.createContext<null | IEbayCardContext>(null);

export interface IEbayCardContextProvierProps {
  children?: ReactNode;
  game: string;
  index: number;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

export const EbayCardContextProvier = (props: IEbayCardContextProvierProps): JSX.Element => {
  const { game, index, platform, sortOrder, children } = props;
  const dispatch = useDispatch();
  const card = useSelector((state: IRootState) => selectEbayCard(state, { game, index, platform, sortOrder }));
  const itemData = card ? card.itemData : null;

  useEffect(() => {
    batch(() => {
      dispatch(getEbaySingleItemByIndex(platform, game, index, sortOrder));
      dispatch(checkIfCardIsWatched(game, platform, index, sortOrder));
    });
  }, []);

  return <EbayCardContext.Provider value={{ card, itemData }}>{children}</EbayCardContext.Provider>;
};

export const useEbayCardContext = (): IEbayCardContext => {
  const context = useContext(EbayCardContext);

  if (!context) {
    throw new Error('useEbayCardContext has to be used within EbayCardContext');
  }

  return context;
};
