import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperOptions } from 'swiper';

import { EEbaySortOrder } from 'Backend/types';
import { IRootState } from 'Store/types';

import { EbayItemCard } from './components/EbayItemCard';
import { DotSpinner, SwiperConfigured, TSwiperConfiguredSlides } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { getEbayItemsGDThunk } from 'Routes/GameDetailed/reducer/thunks';
import { selectEbayCardItems } from 'Store/ebayItemsReducer/selectors';

import styles from './EbaySwiper.module.scss';

interface IEbaySwiperProps {
  className?: string;
  customSwiperProps?: SwiperOptions;
  gameName: string;
  isLoading?: boolean;
  platform: TPlatformNames;
  sortOrder?: EEbaySortOrder;
}

export function EbaySwiper(props: IEbaySwiperProps): JSX.Element {
  const { className, gameName, platform, isLoading, sortOrder = EEbaySortOrder.Relevance, customSwiperProps } = props;
  const ebayItems = useSelector((state: IRootState) =>
    selectEbayCardItems(state, { game: gameName, platform, sortOrder })
  );
  const [slides, setSlides] = useState<TSwiperConfiguredSlides>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbayItemsGDThunk(platform, gameName, sortOrder));
  }, [platform, gameName, sortOrder, dispatch]);

  useEffect(() => {
    if (!ebayItems.length) return;

    const newSlides: TSwiperConfiguredSlides = ebayItems.map(
      (_, index) =>
        function createSlide({ isVisible }) {
          return (
            <EbayItemCard
              platform={platform}
              game={gameName}
              isVisible={!!isVisible}
              sortOrder={sortOrder}
              index={index}
            ></EbayItemCard>
          );
        }
    );

    setSlides(newSlides);
  }, [ebayItems, gameName, platform]);

  return (
    <div className={`${styles.EbaySwiper} ${className}`}>
      {!isLoading && ebayItems.length > 0 && (
        <SwiperConfigured
          className={`${isLoading ? styles.SwiperHidden : ''} ${styles.Swiper}`}
          slides={slides}
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
