import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { getEbayItems } from '../../../Store/Actions/gameDetailedActions';
import { getEbayItems as getEbayItemsWishList } from '../../../Store/Actions/wishListActions';
import SwiperConfigured from '../../UI/SwiperConfigured/SwiperConfigured';
import EbayItemCard from '../EbaySection/EbayItemCard/EbayItemCard';
import { DotSpinner } from 'Components/UI';

import styles from './EbaySection.module.scss';

function EbaySection(props) {
  const {
    className,
    game,
    platform,
    isLoading,
    isMobile,
    fromComponent,
    sortOrder = 'BestMatch',
    customSwiperProps,
  } = props;
  const ebayItems = useSelector((state) => state.ebayItems?.[platform]?.[game]?.[sortOrder]) || [];
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fromComponent === 'WishList') {
      dispatch(getEbayItemsWishList(platform, game, sortOrder));
    } else {
      dispatch(getEbayItems(platform, game, sortOrder));
    }
  }, [platform, game, sortOrder, dispatch]);

  useEffect(() => {
    if (!ebayItems.length) return;
    setSlides(
      ebayItems.map((item, index) => ({ isVisible }) => (
        <EbayItemCard
          platform={platform}
          game={game}
          isVisible={isVisible}
          sortOrder={sortOrder}
          index={index}
        ></EbayItemCard>
      ))
    );
  }, [ebayItems, game, platform]);

  return (
    <div className={`${styles.EbaySection} ${className}`}>
      {!isLoading && ebayItems.length > 0 && (
        <SwiperConfigured
          className={`${isLoading ? styles.SwiperHidden : ''} ${styles.Swiper}`}
          slides={slides}
          isMobile={isMobile}
          customSwiperProps={customSwiperProps}
        />
      )}
      {!isLoading && ebayItems.length === 0 && <h3 className={styles.NoItems}>No lots have been found</h3>}
      {isLoading && (
        <div className={styles.LoadingSvgWrapper}>
          <DotSpinner />
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

export default connect(mapStateToProps)(EbaySection);
