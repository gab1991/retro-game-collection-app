import React, { HTMLAttributes, useEffect, useState } from 'react';
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

interface IEbaySwiperProps extends HTMLAttributes<HTMLDivElement> {
  gameName: string;
  platform: TPlatformNames;
  sortOrder?: EEbaySortOrder;
  swiperProps?: Swiper;
}

export function EbaySwiper(props: IEbaySwiperProps): JSX.Element {
  const { className, gameName, platform, sortOrder = EEbaySortOrder.Relevance, swiperProps, ...htmlProps } = props;
  const ebayItems = useSelector((state: IRootState) =>
    selectEbayCardItems(state, { game: gameName, platform, sortOrder })
  );
  const [slides, setSlides] = useState<TSwiperConfiguredSlides>([]);
  const dispatch = useDispatch();

  const hasItems = !!ebayItems && !!ebayItems.length;
  const emptyArr = !!ebayItems && !ebayItems.length;

  useEffect(() => {
    dispatch(getEbayItemsGDThunk(platform, gameName, sortOrder));
  }, [platform, gameName, sortOrder, dispatch]);

  useEffect(() => {
    if (!ebayItems || !ebayItems.length) {
      return;
    }

    const newSlides: TSwiperConfiguredSlides = ebayItems.map((_, index) => (
      <EbayItemCard key={gameName} platform={platform} game={gameName} sortOrder={sortOrder} index={index}>
        <EbayItemCard.ImagePart />
        <EbayItemCard.AuctionPart />
      </EbayItemCard>
    ));

    setSlides(newSlides);
  }, [ebayItems, gameName, platform]);

  return (
    <div className={cx(styles.EbaySwiper, className)} {...htmlProps}>
      {hasItems && (
        <SwiperConfigured
          className={cx(styles.Swiper, { [styles.SwiperHidden]: !hasItems })}
          slides={slides}
          customSwiperProps={{ ...defaultSwiperProps, ...swiperProps }}
        />
      )}
      {emptyArr && <h3 className={styles.NoItems}>No lots have been found</h3>}
      {!ebayItems && <DotSpinner className={styles.DotSpinner} />}
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
