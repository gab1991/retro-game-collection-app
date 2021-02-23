import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { SwiperOptions } from 'swiper';

import { EEbaySortOrder } from 'Backend/types';
import { IRootState } from 'Store/types';

import EbayItemCard from './EbayItemCard/EbayItemCard';
import { DotSpinner, SwiperConfigured } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { selectEbayCardItems } from 'Store/ebayItemsReducer/selectors';
import { getEbayItems } from 'Store/gameDetailedReducer/thunks';
import { TEbayCard } from 'Typings/EbayData';

import styles from './EbaySwiper.module.scss';

interface IEbaySwiperProps {
  className?: string;
  customSwiperProps?: SwiperOptions;
  gameName: string;
  isLoading?: boolean;
  isMobile?: boolean;
  platform: TPlatformNames;
  sortOrder?: EEbaySortOrder;
}

function _EbaySwiper(props: IEbaySwiperProps) {
  const {
    className,
    gameName,
    platform,
    isLoading,
    isMobile,
    sortOrder = EEbaySortOrder.Relevance,
    customSwiperProps,
  } = props;
  const ebayItems = useSelector((state: IRootState) =>
    selectEbayCardItems(state, { game: gameName, platform, sortOrder })
  );
  const [slides, setSlides] = useState<any[]>([]);
  const dispatch = useDispatch();

  console.log(ebayItems);

  useEffect(() => {
    dispatch(getEbayItems(platform, gameName, sortOrder));
  }, [platform, gameName, sortOrder, dispatch]);

  useEffect(() => {
    if (!ebayItems.length) return;
    setSlides(
      // eslint-disable-next-line react/display-name
      ebayItems.map((item, index) => ({ isVisible }) => (
        <EbayItemCard
          platform={platform}
          game={gameName}
          isVisible={isVisible}
          sortOrder={sortOrder}
          index={index}
        ></EbayItemCard>
      ))
    );
  }, [ebayItems, gameName, platform]);

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
