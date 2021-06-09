import React from 'react';

import { EbayCardAuctionPart, EbayCardImagePart } from './components';
import { EbayCardContextProvier, IEbayCardContextProvierProps } from './context';

import styles from './EbayItemCard.module.scss';

type TEbayItemCardProps = IEbayCardContextProvierProps;

export function EbayItemCard(props: TEbayItemCardProps): JSX.Element {
  return (
    <EbayCardContextProvier {...props}>
      <div className={styles.EbayItemCard}>{props.children}</div>
    </EbayCardContextProvier>
  );
}

EbayItemCard.ImagePart = EbayCardImagePart;
EbayItemCard.AuctionPart = EbayCardAuctionPart;
