import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { EbayItemCard } from 'Components';

import { EEbaySortOrder } from 'Api/types';
import { IRootState } from 'Store/types';

import { DotSpinner, SwiperConfigured, TSwiperConfiguredSlides } from 'Components/UI';
import { TPlatformNames } from 'Configs/appConfig';
import { getEbayItemsGDThunk } from 'Routes/GameDetailed/reducer/thunks';
import { selectEbayCardItems } from 'Store/ebayItemsReducer/selectors';
import { Swiper } from 'swiper/react';

import styles from './EbaySwiper.module.scss';

interface IEbaySwiperProps {
  className?: string;
  gameName: string;
  isLoading?: boolean;
  platform: TPlatformNames;
  sortOrder?: EEbaySortOrder;
  swiperProps?: Swiper;
}

export function EbaySwiper(props: IEbaySwiperProps): JSX.Element {
  const { className, gameName, platform, isLoading, sortOrder = EEbaySortOrder.Relevance, swiperProps } = props;
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
      <EbayItemCard key={gameName} platform={platform} game={gameName} sortOrder={sortOrder} index={index}>
        <EbayItemCard.ImagePart />
        <EbayItemCard.AuctionPart />
      </EbayItemCard>
    ));

    setSlides(newSlides);
  }, [ebayItems, gameName, platform]);

  return (
    <div className={`${styles.EbaySwiper} ${className}`}>
      {!isLoading && ebayItems.length > 0 && (
        <SwiperConfigured
          className={cx(styles.Swiper, { [styles.SwiperHidden]: isLoading })}
          slides={slides}
          customSwiperProps={{ ...defaultSwiperProps, ...swiperProps }}
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

const defaultSwiperProps: Swiper = {
  breakpoints: {
    [1060]: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    [750]: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
  },
  pagination: false,
  slidesPerView: 1,
  spaceBetween: 5,
  virtual: true,
};
