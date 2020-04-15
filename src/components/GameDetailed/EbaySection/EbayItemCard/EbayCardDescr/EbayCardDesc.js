import React, { useState, useEffect } from 'react';
import styles from './EbayCardDesc.module.scss';
import Button from '../../../../UI/Buttons/Button/Button';
import DotSpinner from '../../../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import { connect, useDispatch } from 'react-redux';

import { withRouter } from 'react-router-dom';
import Backend from '../../../../../Backend/Backend';
import ErrorModal from '../../../../UI/Modals/ErrorModal/ErrorModal';

function EbayCardDesc(props) {
  const {
    userData,
    itemId,
    title,
    convertedCurrentPrice,
    game,
    platform,
    currentPrice,
    currency,
    shipping,
    deliveryPrice,
    listingType,
    itemUrl,
    bidCount,
    endTime: endTimeProp,
    isAuction,
    auctionSetter,
    isEndingSoon,
    endingSoonSetter,
    sendToEbay,
  } = props;
  const [loadShipCosts, setLoadShipCosts] = useState();
  const [total, setTotal] = useState();
  const [finalDeliveryPrice, setDelivertPrice] = useState(deliveryPrice);
  const [notCalculated, setNotCalculated] = useState();
  const [isWatched, setIsWatched] = useState();

  useEffect(() => {
    Backend.isWatchedEbayCard(userData.username, userData.token, {
      gameName: game,
      platform: platform,
      ebayItemId: itemId,
    }).then((res) => {
      console.log(res);
      if (res.success) setIsWatched(true);
      else console.log(res.err_message);
    });
  }, [itemId]);

  useEffect(() => {
    if (currentPrice) {
      const updTotal = (
        Number(finalDeliveryPrice) + Number(currentPrice)
      ).toFixed(2);
      setTotal(updTotal);
    }
  }, [finalDeliveryPrice, currentPrice]);

  useEffect(() => {
    if (endTimeProp) {
      const endTime = new Date(endTimeProp);
      const currentTime = new Date();
      const diffMs = Math.abs(endTime - currentTime) / 1000;
      const days = Math.floor(diffMs / 86400);

      let interval;
      if (days < 1) {
        interval = setInterval(() => {
          const currentTime = new Date();
          const diffMs = Math.abs(endTime - currentTime) / 1000;
          const hours = Math.floor(diffMs / 3600) % 24;
          const minutes = Math.floor(diffMs / 60) % 60;
          const seconds = Math.floor(diffMs % 60);
          endingSoonSetter({
            hours: `${hours < 10 ? '0' : ''}${hours}`,
            minutes: `${minutes < 10 ? '0' : ''}${minutes}`,
            seconds: `${seconds < 10 ? '0' : ''}${seconds}`,
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }
  }, [endTimeProp]);

  useEffect(() => {
    if (listingType !== 'FixedPriceItem') auctionSetter(true);
  }, [listingType]);

  const getShippingCosts = () => {
    setLoadShipCosts(true);
    Backend.getShippingCosts(itemId).then((res) => {
      if (res.ShippingCostSummary) {
        const shippingCost = Number(
          res.ShippingCostSummary.ShippingServiceCost.Value
        ).toFixed(2);
        setDelivertPrice(shippingCost);
      } else {
        setDelivertPrice('');
        setNotCalculated('Contact seller');
      }
      setLoadShipCosts(false);
    });
  };

  const watchHandler = () => {
    if (!isWatched) {
      setIsWatched(true);
      Backend.watchEbayCard(userData.username, userData.token, {
        gameName: game,
        platform: platform,
        ebayItemId: itemId[0],
      }).then((res) => {
        if (res.err_message) console.log(res.err_message);
      });
    } else {
      setIsWatched(false);
      Backend.notWatchEbayCard(userData.username, userData.token, {
        gameName: game,
        platform: platform,
        ebayItemId: itemId[0],
      }).then((res) => {
        if (res.err_message) console.log(res.err_message);
      });
    }
  };

  return (
    <div className={styles.Description}>
      <h4>{title}</h4>
      <Button
        txtContent={isAuction ? 'Place bid' : 'Buy It Now'}
        onClick={sendToEbay}
      />
      <Button
        txtContent={isWatched ? 'Stop watch' : 'Watch'}
        pressed={isWatched ? true : false}
        onClick={watchHandler}
      />
      <div className={styles.AcutionSection}>
        {isAuction && <p>Bids placed : {bidCount}</p>}
        {isEndingSoon && (
          <p className={styles.TimeLeft}>
            {`Time Left : ${isEndingSoon.hours}:${isEndingSoon.minutes}:${isEndingSoon.seconds}`}
          </p>
        )}
      </div>

      <div className={styles.PriceSection}>
        <strong>{isAuction ? 'Bid' : 'PRICE'}</strong>
        {`${' : '} ${currentPrice} ${currency}`}
        <div className={styles.Delivery}>
          {!finalDeliveryPrice && !loadShipCosts && !notCalculated && (
            <span onClick={getShippingCosts}>Define shipping costs</span>
          )}
          {!finalDeliveryPrice && loadShipCosts && (
            <div className={styles.SpinnerContainer}>
              <DotSpinner />
            </div>
          )}
          {!finalDeliveryPrice && notCalculated && `${notCalculated}`}
          {finalDeliveryPrice &&
            `${'+ Shipping'} ${finalDeliveryPrice} ${currency}`}
        </div>
        <hr></hr>
        <p className={styles.Total}>
          <strong>TOTAL</strong>
          {' : '} {total} {currency}
        </p>
      </div>
      {isEndingSoon && (
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
