import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { EEbaySortOrder } from 'Api/types';
import { IRootState } from 'Store/types';

import { TPlatformNames } from 'Configs/appConfig';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import { checkIfCardIsWatched, getEbaySingleItemByIndex } from 'Store/ebayItemsReducer/thunks';

import { EbayCardLeftPart, EbayCardRightPart } from './components';
import { EbayItemCardSkeleton } from './EbayItemCard.skeleton';

import styles from './EbayItemCard.module.scss';

interface IEbayItemCardProps {
  game: string;
  index: number;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

export function EbayItemCard(props: IEbayItemCardProps): JSX.Element {
  const dispatch = useDispatch();
  const { index, platform, game, sortOrder = EEbaySortOrder.Relevance } = props;
  const card = useSelector((state: IRootState) => selectEbayCard(state, { game, index, platform, sortOrder }));
  const itemData = card?.itemData;

  useEffect(() => {
    batch(() => {
      dispatch(getEbaySingleItemByIndex(platform, game, index, sortOrder));
      dispatch(checkIfCardIsWatched(game, platform, index, sortOrder));
    });
  }, []);

  return (
    <div className={styles.EbayItemCard}>
      {/* {itemData && <EbayCardLeftPart itemData={itemData} />}
      {card && itemData && <EbayCardRightPart {...props} card={card} itemData={itemData} index={index} />}
      {!itemData && <EbayItemCardSkeleton />} */}
      <EbayItemCardSkeleton />
    </div>
  );
}
