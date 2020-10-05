import React, { useState, useEffect } from 'react';
import { useDipatch } from 'react-redux';
import {
  checkIfCardIsWatched,
  watchEbayCard,
  notWatchEbayCard,
  getShippingCosts,
  calculateTotalPrice,
  setEndingSoon,
} from '../../../../../Store/Actions/ebayItemsActions';
import styles from './EbayCardDesc.module.scss';
import Button from '../../../../UI/Buttons/Button/Button';
import DotSpinner from '../../../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import { connect, useDispatch } from 'react-redux';

function EbayCardDesc(props) {
  const {
    userData,
    index,
    title,
    game,
    platform,
    currentPrice,
    currency,
    itemId,
    bidCount,
    endTime: endTimeProp,
    sendToEbay,
    isWatched,
    isAuction,
    shippingCost,
    isLoadingShippingCosts,
    totalPrice,
    contactSeller,
    // endingSoon,
  } = props;
  const [endingSoon, setIsEndingSoon] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfCardIsWatched(game, platform, index));
  }, [game, platform, index]);

  useEffect(() => {
    dispatch(calculateTotalPrice(index));
  }, [shippingCost, currentPrice]);

  useEffect(() => {
    if (endTimeProp) {
      const endTime = new Date(endTimeProp);
      const currentTime = new Date();
      const diffMs = Math.abs(endTime - currentTime) / 1000;
      const days = Math.floor(diffMs / 86400);

      let interval;
      if (days < 10) {
        interval = setInterval(() => {
          const currentTime = new Date();
          const diffMs = Math.abs(endTime - currentTime) / 1000;
          const hours = Math.floor(diffMs / 3600) % 24;
          const minutes = Math.floor(diffMs / 60) % 60;
          const seconds = Math.floor(diffMs % 60);
          // dispatch(
          //   setEndingSoon(index, {
          //     hours: `${hours < 10 ? '0' : ''}${hours}`,
          //     minutes: `${minutes < 10 ? '0' : ''}${minutes}`,
          //     seconds: `${seconds < 10 ? '0' : ''}${seconds}`,
          //   })
          // );
          setIsEndingSoon({
            hours: `${hours < 10 ? '0' : ''}${hours}`,
            minutes: `${minutes < 10 ? '0' : ''}${minutes}`,
            seconds: `${seconds < 10 ? '0' : ''}${seconds}`,
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [endTimeProp]);

  const defineShippingCosts = () => {
    dispatch(getShippingCosts(itemId, index));
  };

  const watchHandler = () => {
    if (!isWatched) {
      dispatch(watchEbayCard(game, platform, itemId, index));
    } else {
      dispatch(notWatchEbayCard(game, platform, itemId, index));
    }
  };

  return (
    <div className={styles.Description}>
      <h4>{title}</h4>
      <Button
        txtContent={isAuction ? 'Place bid' : 'Buy It Now'}
        onClick={sendToEbay}
      />
      {userData && (
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
        {`${' : '} ${currentPrice} ${currency}`}
        <div className={styles.Delivery}>
          {!shippingCost && !isLoadingShippingCosts && !contactSeller && (
            <span onClick={defineShippingCosts}>Define shipping costs</span>
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

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(EbayCardDesc);
