import React from 'react';

import { EbayCardAuctionPart, EbayCardImagePart } from './components';
import { EbayCardContextProvier, IEbayCardContextProvierProps, useEbayCardContext } from './context';
import { EbayItemCardSkeleton } from './EbayItemCard.skeleton';

import styles from './EbayItemCard.module.scss';

type TEbayItemCardProps = IEbayCardContextProvierProps;

export function EbayItemCard(props: TEbayItemCardProps): JSX.Element {
  return (
    <EbayCardContextProvier {...props}>
      <EbayItemCardContent {...props} />
    </EbayCardContextProvier>
  );
}

function EbayItemCardContent(props: TEbayItemCardProps): JSX.Element {
  const { card, itemData } = useEbayCardContext();
  return card && itemData ? <div className={styles.EbayItemCard}>{props.children}</div> : <EbayItemCardSkeleton />;
}

EbayItemCard.ImagePart = EbayCardImagePart;
EbayItemCard.AuctionPart = EbayCardAuctionPart;
