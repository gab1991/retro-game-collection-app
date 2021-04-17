import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { EEbaySortOrder } from 'Backend/types';
import { IRootState } from 'Store/types';

import { OvalSpinner } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import { checkIfCardIsWatched, getEbaySingleItemByIndex } from 'Store/ebayItemsReducer/thunks';

import { EbayCardDesc, EbayCardLeftPart } from './components';

import styles from './EbayItemCard.module.scss';

interface IEbayItemCardProps {
  game: string;
  index: number;
  isVisible: boolean;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

export function EbayItemCard(props: IEbayItemCardProps): JSX.Element {
  const dispatch = useDispatch();
  const { index, isVisible, platform, game, sortOrder = EEbaySortOrder.Relevance } = props;
  const card = useSelector((state: IRootState) => selectEbayCard(state, { game, index, platform, sortOrder }));
  const itemData = card?.itemData;

  useEffect(() => {
    if (!isVisible) return;

    batch(() => {
      dispatch(getEbaySingleItemByIndex(platform, game, index, sortOrder));
      dispatch(checkIfCardIsWatched(game, platform, index, sortOrder));
    });
  }, [index, isVisible, platform, game, dispatch]);

  return (
    <div className={styles.EbayItemCard}>
      {itemData && <EbayCardLeftPart itemData={itemData} />}
      {card && itemData && <EbayCardDesc {...props} card={card} itemData={itemData} index={index} />}
      {!itemData && (
        <div className={styles.CardSpinner}>
          <OvalSpinner />
        </div>
      )}
    </div>
  );
}
