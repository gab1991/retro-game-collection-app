import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import EbayItemCard from './EbayItemCard/EbayItemCard';
import { DotSpinner, SwiperConfigured } from 'Components/UI';
import { getEbayItems } from 'Store/gameDetailedReducer/thunks';

import styles from './EbaySwiper.module.scss';

function _EbaySwiper(props) {
  const { className, game, platform, isLoading, isMobile, sortOrder = 'BestMatch', customSwiperProps } = props;
  const ebayItems = useSelector((state) => state.ebayItems?.[platform]?.[game]?.[sortOrder]) || [];
  const [slides, setSlides] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbayItems(platform, game, sortOrder));
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
    <div className={`${styles.EbaySwiper} ${className}`}>
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

export const EbaySwiper = connect(mapStateToProps)(_EbaySwiper);