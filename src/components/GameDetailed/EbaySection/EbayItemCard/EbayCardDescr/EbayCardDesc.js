import React, { useState, useEffect } from 'react';
import styles from './EbayCardDesc.module.css';
import Button from '../../../../UI/Buttons/Button/Button';
import DotSpinner from '../../../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import Backend from '../../../../../Backend/Backend';

export default function EbayCardDesc(props) {
  const {
    itemId,
    title,
    convertedCurrentPrice,
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

  useEffect(() => {
    if (currentPrice) {
      const updTotal = (
        Number(finalDeliveryPrice) + Number(currentPrice)
      ).toFixed(2);
      setTotal(updTotal);
    }
  }, [finalDeliveryPrice, currentPrice]);

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
      }
      setLoadShipCosts(false);
    });
  };

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

  return (
    <div className={styles.Description}>
      <h4>{title}</h4>
      <Button
        txtContent={isAuction ? 'Place bid' : 'Buy It Now'}
        onClick={sendToEbay}
      />
      {isAuction && <span>Bids placed : {bidCount}</span>}
      {isEndingSoon && (
        <span>
          {`Time Left : ${isEndingSoon.hours}h:${isEndingSoon.minutes}m:${isEndingSoon.seconds}s`}
        </span>
      )}
      <div className={styles.PriceSection}>
        <strong>{isAuction ? 'Bid' : 'PRICE'}</strong>
        {`${' : '} ${currentPrice} ${currency}`}
        <div className={styles.Delivery}>
          {!finalDeliveryPrice && !loadShipCosts && (
            <span onClick={getShippingCosts}>Define shipping costs</span>
          )}
          {!finalDeliveryPrice && loadShipCosts && (
            <div className={styles.SpinnerContainer}>
              <DotSpinner />
            </div>
          )}
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
