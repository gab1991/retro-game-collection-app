import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInterval } from 'CustomHooks';

import { useEbayCardContext } from 'Components/EbayItemCard/context';
import { Button, DotSpinner } from 'Components/UI';
import { selectLoggedUser } from 'Store/authReducer/selectors';

import { calcExpiringTime, ITimeSpread } from './countdownConverter';

import styles from './EbayCardAuctionPart.module.scss';

const REFRESH_TIME_MS = 1000;
const ADDITIONAL_ZERO_BOUNDARY = 10;

type TTimeSpreadStingVal = { [k in keyof ITimeSpread]?: string };

// eslint-disable-next-line sonarjs/cognitive-complexity
export function EbayCardAuctionPart(): JSX.Element | null {
  const { itemData, card, calcTotalPrice, defineShippingCosts, onWatchBtnClick } = useEbayCardContext();
  const { clearHookInterval, setHookInterval } = useInterval();
  const username = useSelector(selectLoggedUser);
  const [endingSoon, setIsEndingSoon] = useState<null | TTimeSpreadStingVal>(null);

  useEffect(() => {
    calcTotalPrice();
  }, [itemData?.currentPrice, card?.shippingCost]);

  useEffect(() => {
    const endTime = itemData?.endTime;
    if (endTime) {
      const { days } = calcExpiringTime(endTime);

      if (days < 1) {
        setHookInterval(() => {
          const { hours, minutes, seconds } = calcExpiringTime(endTime);

          setIsEndingSoon({
            hours: `${hours < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${hours}`,
            minutes: `${minutes < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${minutes}`,
            seconds: `${seconds < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${seconds}`,
          });
        }, REFRESH_TIME_MS);
      }
      return () => clearHookInterval();
    }
  }, [itemData?.endTime]);

  if (!card || !itemData) {
    return null;
  }

  const { isWatched, shippingCost, contactSeller, isLoadingShippingCosts, totalPrice, isAuction } = card;
  const { bidCount, currency, itemUrl, title, currentPrice } = itemData;

  const sendToEbay = () => window.open(itemUrl, '_blank');

  return (
    <div className={styles.RightPart}>
      <h4>{title}</h4>
      <Button txtContent={isAuction ? 'Place bid' : 'Buy It Now'} onClick={sendToEbay} />
      {username && (
        <Button
          txtContent={isWatched ? 'Stop watch' : 'Watch'}
          pressed={isWatched ? true : false}
          onClick={() => onWatchBtnClick(isWatched)}
        />
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
