import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'CustomHooks';

import { EEbaySortOrder } from 'Api/types';
import { DeepReadonly } from 'utility-types';

import { Button, DotSpinner } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { selectLoggedUser } from 'Store/authReducer/selectors';
import { calculateTotalPrice } from 'Store/ebayItemsReducer/actions';
import { getShippingCosts, notWatchEbayCard, watchEbayCard } from 'Store/ebayItemsReducer/thunks';
import { IEbayCardItemData, TEbayCard } from 'Typings/EbayData';

import { calcExpiringTime, ITimeSpread } from './countdownConverter';

import styles from './EbayCardRightPart.module.scss';

const REFRESH_TIME_MS = 1000;
const ADDITIONAL_ZERO_BOUNDARY = 10;

interface IEbayCardDescProps {
  card: DeepReadonly<TEbayCard>;
  game: string;
  index: number;
  itemData: DeepReadonly<IEbayCardItemData>;
  platform: TPlatformNames;
  sortOrder: EEbaySortOrder;
}

type TTimeSpreadStingVal = { [k in keyof ITimeSpread]?: string };

//REFACTOR
// eslint-disable-next-line sonarjs/cognitive-complexity
export function EbayCardRightPart(props: IEbayCardDescProps): JSX.Element {
  const dispatch = useDispatch();
  const { clearHookInterval, setHookInterval } = useInterval();
  const { index, sortOrder, platform, game, card, itemData } = props;
  const username = useSelector(selectLoggedUser);
  const { isWatched, shippingCost, contactSeller, isLoadingShippingCosts, totalPrice, isAuction } = card;
  const { bidCount, currency, itemUrl, endTime, itemId, title, currentPrice } = itemData;

  const [endingSoon, setIsEndingSoon] = useState<null | TTimeSpreadStingVal>(null);

  useEffect(() => {
    dispatch(calculateTotalPrice(platform, game, index, sortOrder));
  }, [dispatch, currentPrice, shippingCost]);

  useEffect(() => {
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

  const sendToEbay = () => window.open(itemUrl, '_blank');

  return (
    <div className={styles.RightPart}>
      <h4>{title}</h4>
      <Button txtContent={isAuction ? 'Place bid' : 'Buy It Now'} onClick={sendToEbay} />
      {username && (
        <Button
          txtContent={isWatched ? 'Stop watch' : 'Watch'}
          pressed={isWatched ? true : false}
          onClick={watchHandler}
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
