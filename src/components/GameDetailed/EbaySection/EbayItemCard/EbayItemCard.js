import React, { useState, useEffect } from 'react';
import Slider from '../../../UI/Slider/Slider';
import EbayCardDesc from './EbayCardDescr/EbayCardDesc';
import Backend from '../../../../Backend/Backend';
import EbayLogo from '../../../UI/LogoSvg/EbayLogo/EbayLogo';
import OvalSpinner from '../../../UI/LoadingSpinners/OvalSpinner/OvalSpinner';
import styles from './EbayItemCard.css';

function openInNewTab(url) {
  const win = window.open(url, '_blank');
  win.focus();
}

export default function EbayItemCard(props) {
  const { itemId } = props;
  const [itemData, setItemData] = useState();
  const [isAuction, setIsAuction] = useState(false);
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    Backend.getEbaySingleItem(itemId).then((res) => {
      const item = res.Item;
      const itemData = {
        pictures: item.PictureURL,
        title: item.Title,
        convertedCurrentPrice: item.ConvertedCurrentPrice,
        currentPrice: Number(item.ConvertedCurrentPrice.Value).toFixed(2),
        currency: item.ConvertedCurrentPrice.CurrencyID,
        shipping: item.ShippingCostSummary,
        deliveryPrice: item.ShippingServiceCost
          ? item.ShippingServiceCost.Value
          : '',
        listingType: item.ListingType,
        itemUrl: item.ViewItemURLForNaturalSearch,
        bidCount: item.BidCount,
        endTime: item.EndTime,
      };
      setItemData(itemData);
      console.log(itemData);
    });
  }, [itemId]);

  const sendToEbay = () => {
    openInNewTab(itemData.itemUrl);
  };

  const auctionSetter = (bool) => {
    setIsAuction(bool);
  };

  const endingSoonSetter = (val) => {
    setIsEndingSoon(val);
  };

  return (
    <div className={styles.EbayItemCard}>
      {itemData && (
        <>
          <div className={styles.ImgArea}>
            <Slider
              transition="off"
              images={itemData.pictures}
              imageWidth={200}
              imageHeight={200}
              navDots
              imgFit={'contain'}
            />
            <div className={styles.SvgWrapper} onClick={sendToEbay}>
              <EbayLogo />
            </div>
          </div>
          <EbayCardDesc
            {...itemData}
            itemId={itemId}
            isAuction={isAuction}
            isEndingSoon={isEndingSoon}
            sendToEbay={sendToEbay}
            auctionSetter={auctionSetter}
            endingSoonSetter={endingSoonSetter}
          />
        </>
      )}
      {!itemData && (
        <div className={styles.CardSpinner}>
          <OvalSpinner />
        </div>
      )}
    </div>
  );
}
