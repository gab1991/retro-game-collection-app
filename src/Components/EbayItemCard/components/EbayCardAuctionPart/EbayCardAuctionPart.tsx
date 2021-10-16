import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { useEbayCardContext } from 'Components/EbayItemCard/context';
import { Button, DotSpinner } from 'Components/UI';
import { selectLoggedUser } from 'Store/authReducer/selectors';

import { useEndingSoon } from './useEndingSoon';

import styles from './EbayCardAuctionPart.module.scss';

export function EbayCardAuctionPart(): JSX.Element | null {
  const { itemData, card, defineShippingCosts, onWatchBtnClick } = useEbayCardContext();
  const username = useSelector(selectLoggedUser);
  const { endingSoon } = useEndingSoon(itemData?.endTime);

  if (!card || !itemData) {
    return null;
  }

  const { isWatched, shippingCost, contactSeller, isLoadingShippingCosts, totalPrice, isAuction } = card;
  const { bidCount, currency, itemUrl, title, currentPrice } = itemData;

  const sendToEbay = () => window.open(itemUrl, '_blank');

  return (
    <div className={styles.RightPart}>
      <h4>{title}</h4>
      <Button onClick={sendToEbay}>{isAuction ? 'Place bid' : 'Buy It Now'}</Button>
      {username && (
        <Button className={cn({ [styles.BtnGray]: isWatched })} onClick={() => onWatchBtnClick(isWatched)}>
          {isWatched ? 'Stop watch' : 'Watch'}
        </Button>
      )}
      <div className={styles.AcutionSection}>
        {isAuction && <p>Bids placed : {bidCount}</p>}
        {endingSoon && (
          <p className={styles.TimeLeft}>
            {`Time Left : ${endingSoon.hours}:${endingSoon.minutes}:${endingSoon.seconds}`}
          </p>
        )}
      </div>
      <div className={styles.PriceSection}>
        <strong>{isAuction ? 'Bid' : 'PRICE'}</strong>
        {`${' : '} ${currentPrice.toFixed(2)} ${currency}`}
        <div className={styles.Delivery}>
          {!shippingCost && !isLoadingShippingCosts && !contactSeller && (
            <button onClick={defineShippingCosts} className={styles.DefineShippingCosts}>
              Define shipping costs
            </button>
          )}
          {!shippingCost && isLoadingShippingCosts && (
            <div className={styles.SpinnerContainer}>
              <DotSpinner />
            </div>
          )}
          {!shippingCost && contactSeller && `Contact seller`}
          {shippingCost && `${'+ Shipping'} ${shippingCost} ${currency}`}
        </div>
        <hr></hr>
        <p className={styles.Total}>
          <strong>TOTAL</strong>
          {' : '} {totalPrice} {currency}
        </p>
      </div>
      {endingSoon && (
        <div className={`${styles.Ribbon} ${styles.RibbonTopLeft}`}>
          <span>ENDING SOON</span>
        </div>
      )}
    </div>
  );
}
