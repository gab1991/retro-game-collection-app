import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EEbaySortOrder } from 'Backend/types';
import { DeepReadonly } from 'utility-types';

import { Button, DotSpinner } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { calculateTotalPrice } from 'Store/ebayItemsReducer/actions';
import { checkIfCardIsWatched, getShippingCosts, notWatchEbayCard, watchEbayCard } from 'Store/ebayItemsReducer/thunks';
import { TEbayCard } from 'Typings/EbayData';

import { calcExpiringTime, ITimeSpread } from './countdownConverter';

import styles from './EbayCardDesc.module.scss';

const REFRESH_TIME_MS = 1000;
const ADDITIONAL_ZERO_BOUNDARY = 10;

interface IEbayCardDescProps {
  card: DeepReadonly<TEbayCard>;
  game: string;
  index: number;
  isLoadingShippingCosts?: boolean;
  isWatched?: boolean;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

type TTimeSpreadStingVal = { [k in keyof ITimeSpread]?: string };

export function EbayCardDesc(props: IEbayCardDescProps): JSX.Element {
  const dispatch = useDispatch();
  const { index, sortOrder, isLoadingShippingCosts, isWatched, platform, game, card } = props;
  const username = useSelector(selectLoggedUser);
  const {
    itemData: { bidCount, currency, itemUrl, endTime, itemId, title, currentPrice },
    shippingCost,
    contactSeller,
  } = card;

  const [endingSoon, setIsEndingSoon] = useState<null | TTimeSpreadStingVal>(null);

  useEffect(() => {
    dispatch(checkIfCardIsWatched(game, platform, index, sortOrder));
  }, [game, platform, index, dispatch]);

  useEffect(() => {
    dispatch(calculateTotalPrice(platform, game, index, sortOrder));
  }, [shippingCost, currentPrice, index, dispatch]);

  useEffect(() => {
    if (endTime) {
      const { days } = calcExpiringTime(endTime);

      let interval: NodeJS.Timeout;
      if (days < 1) {
        setInterval(() => {
          const { hours, minutes, seconds } = calcExpiringTime(endTime);

          setIsEndingSoon({
            hours: `${hours < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${hours}`,
            minutes: `${minutes < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${minutes}`,
            seconds: `${seconds < ADDITIONAL_ZERO_BOUNDARY ? '0' : ''}${seconds}`,
          });
        }, REFRESH_TIME_MS);
      }
      return () => clearInterval(interval);
    }
  }, [endTime]);

  const defineShippingCosts = () => {
    dispatch(getShippingCosts(game, platform, itemId, index, sortOrder));
  };

  const watchHandler = () => {
    if (!isWatched) {
      dispatch(watchEbayCard(game, platform, itemId, index));
    } else {
      dispatch(notWatchEbayCard(game, platform, itemId, index));
    }
  };

  const sendToEbay = () => {
    return window.open(itemUrl, '_blank');
  };

  return (
    <div className={styles.Description}>
      <h4>{title}</h4>
      <Button txtContent={card?.isAuction ? 'Place bid' : 'Buy It Now'} onClick={sendToEbay} />
      {username && (
        <Button
          txtContent={isWatched ? 'Stop watch' : 'Watch'}
          pressed={isWatched ? true : false}
          onClick={watchHandler}
        />
      )}
      <div className={styles.AcutionSection}>
        {card?.isAuction && <p>Bids placed : {bidCount}</p>}
        {endingSoon && (
          <p className={styles.TimeLeft}>
            {`Time Left : ${endingSoon.hours}:${endingSoon.minutes}:${endingSoon.seconds}`}
          </p>
        )}
      </div>
      <div className={styles.PriceSection}>
        <strong>{card?.isAuction ? 'Bid' : 'PRICE'}</strong>
        {`${' : '} ${currentPrice} ${currency}`}
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
          {' : '} {card?.totalPrice} {currency}
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
