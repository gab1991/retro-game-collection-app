import React, { useEffect } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { getEbaySingleItem } from '../../../../Store/Actions/ebayItemsActions';
import Slider from '../../../UI/Slider/Slider';
import EbayCardDesc from './EbayCardDescr/EbayCardDesc';
import EbayLogo from '../../../UI/LogoSvg/EbayLogo/EbayLogo';
import OvalSpinner from '../../../UI/LoadingSpinners/OvalSpinner/OvalSpinner';
import styles from './EbayItemCard.module.scss';

function EbayItemCard(props) {
  const dispatch = useDispatch();
  const { isMobile, game, platform, index, isVisible } = props;
  const card = useSelector((state) => state.ebayItems[index]);
  const {
    itemData,
    isWatched,
    isAuction,
    shippingCost,
    isLoadingShippingCosts = false,
    totalPrice,
    contactSeller,
    endingSoon,
  } = card;
  const { itemId } = itemData || {};

  useEffect(() => {
    if (!isVisible) return;
    dispatch(getEbaySingleItem(index));
  }, [index, isVisible]);

  return (
    <div className={styles.EbayItemCard}>
      {itemData && (
        <>
          <div className={styles.ImgArea}>
            <Slider
              transition="off"
              images={itemData.pictures}
              imageWidth={isMobile ? 150 : 200}
              imageHeight={isMobile ? 190 : 220}
              navDots
              imgFit={'cover'}
            />
            <a
              className={styles.SvgWrapper}
              href={itemData.itemUrl}
              rel="noopener noreferrer"
              target="_blank">
              <EbayLogo />
            </a>
          </div>
          <EbayCardDesc
            {...itemData}
            shippingCost={shippingCost}
            isWatched={isWatched}
            isAuction={isAuction}
            game={game}
            platform={platform}
            index={index}
            itemId={itemId}
            isLoadingShippingCosts={isLoadingShippingCosts}
            totalPrice={totalPrice}
            contactSeller={contactSeller}
            endingSoon={endingSoon}
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

function mapStateToProps(state) {
  return {
    isMobile: state.appState.isMobile,
  };
}

export default connect(mapStateToProps)(EbayItemCard);
