import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EEbaySortOrder } from 'Api/types';
import { IRootState } from 'Store/types';

import { EbayItemCard } from './components/EbayItemCard';
import { DotSpinner, SwiperConfigured, TSwiperConfiguredSlides } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { getEbayItemsGDThunk } from 'Routes/GameDetailed/reducer/thunks';
import { selectEbayCardItems } from 'Store/ebayItemsReducer/selectors';
import { Swiper } from 'swiper/react';

import styles from './EbaySwiper.module.scss';
import sassVars from 'Configs/Variables.scss';

const desktopBreakpoint = parseInt(sassVars['breakpoints-desktop']);
const tabletBreakpoint = parseInt(sassVars['breakpoints-tablet']);

interface IEbaySwiperProps {
  className?: string;
  gameName: string;
  isLoading?: boolean;
  platform: TPlatformNames;
  sortOrder?: EEbaySortOrder;
}

export function EbaySwiper(props: IEbaySwiperProps): JSX.Element {
  const { className, gameName, platform, isLoading, sortOrder = EEbaySortOrder.Relevance } = props;
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

    const newSlides: TSwiperConfiguredSlides = ebayItems.map((_, index) => (
      <EbayItemCard
        key={gameName}
        platform={platform}
        game={gameName}
        sortOrder={sortOrder}
        index={index}
      ></EbayItemCard>
    ));

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

const customSwiperProps: Swiper = {
  breakpoints: {
    670: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    [desktopBreakpoint]: {
      slidesPerView: 3,
    },
    [tabletBreakpoint]: {
      slidesPerView: 2,
    },
  },
  pagination: false,
  slidesPerView: 1,
  virtual: true,
};
