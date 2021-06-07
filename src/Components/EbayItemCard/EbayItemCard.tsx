import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { EEbaySortOrder } from 'Api/types';
import { IRootState } from 'Store/types';

import { TPlatformNames } from 'Configs/appConfig';
import { selectEbayCard } from 'Store/ebayItemsReducer/selectors';
import { checkIfCardIsWatched, getEbaySingleItemByIndex } from 'Store/ebayItemsReducer/thunks';

import { EbayCardLeftPart, EbayCardRightPart } from './components';
import { EbayCardContextProvier, IEbayCardContextProvierProps } from './context';
import { EbayItemCardSkeleton } from './EbayItemCard.skeleton';

import styles from './EbayItemCard.module.scss';

type TEbayItemCardProps = IEbayCardContextProvierProps;
export function EbayItemCard(props: TEbayItemCardProps): JSX.Element {
  return (
    <EbayCardContextProvier {...props}>
      <div className={styles.EbayItemCard}>
        {/* {itemData && <EbayCardLeftPart itemData={itemData} />}
      {card && itemData && <EbayCardRightPart {...props} card={card} itemData={itemData} index={index} />} */}
        {/* {!itemData && <EbayItemCardSkeleton />} */}
      </div>
    </EbayCardContextProvier>
  );
}
