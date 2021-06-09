import React, { ReactNode, useContext, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { EEbaySortOrder } from 'Api';

import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { TPlatformNames } from 'Configs/appConfig';
import { calculateTotalPrice } from 'Store/ebayItemsReducer/actions';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import {
  checkIfCardIsWatched,
  getEbaySingleItemByIndex,
  getShippingCosts,
  notWatchEbayCard,
  watchEbayCard,
} from 'Store/ebayItemsReducer/thunks';
import { TEbayCard } from 'Typings/EbayData';

interface IEbayCardContext {
  calcTotalPrice: () => void;
  card: DeepReadonly<TEbayCard> | null;
  defineShippingCosts: () => void;
  itemData: DeepReadonly<TEbayCard['itemData']> | null;
  onWatchBtnClick: (isWatched: boolean) => void;
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
  const itemId = itemData?.itemId;

  useEffect(() => {
    batch(() => {
      dispatch(getEbaySingleItemByIndex(platform, game, index, sortOrder));
      dispatch(checkIfCardIsWatched(game, platform, index, sortOrder));
    });
  }, []);

  const calcTotalPrice = () => dispatch(calculateTotalPrice(platform, game, index, sortOrder));

  const defineShippingCosts = () => {
    itemId && dispatch(getShippingCosts(game, platform, itemId, index, sortOrder));
  };

  const onWatchBtnClick = (isWatched: boolean) => {
    if (!itemId) {
      return;
    }
    if (!isWatched) {
      dispatch(watchEbayCard(game, platform, itemId, index));
    } else {
      dispatch(notWatchEbayCard(game, platform, itemId, index));
    }
  };

  return (
    <EbayCardContext.Provider value={{ calcTotalPrice, card, defineShippingCosts, itemData, onWatchBtnClick }}>
      {children}
    </EbayCardContext.Provider>
  );
};

export const useEbayCardContext = (): IEbayCardContext => {
  const context = useContext(EbayCardContext);

  if (!context) {
    throw new Error('useEbayCardContext has to be used within EbayCardContext');
  }

  return context;
};
