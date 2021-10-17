import React from 'react';

import { useEbayCardContext } from 'Components/EbayItemCard/context';
import { SwiperConfigured } from 'Components/UI';
import { EbayLogo } from 'Components/UI/LogoSvg';
import { Swiper } from 'swiper/react';

import styles from './EbayCardImagePart.module.scss';

export function EbayCardImagePart(): JSX.Element | null {
  const { itemData } = useEbayCardContext();

  if (!itemData) {
    return null;
  }
  const { pictures, itemUrl } = itemData;

  const slides = pictures.map((url) => <img src={url} key={url} alt={''} className={styles.slideImg}></img>);

  return (
    <div className={styles.ImgArea}>
      <SwiperConfigured slides={slides} customSwiperProps={swiperProps} />
      <a className={styles.SvgWrapper} href={itemUrl} rel='noopener noreferrer' target='_blank'>
        <EbayLogo />
      </a>
    </div>
  );
}

const swiperProps: Swiper = {
  allowSlideNext: false,
  allowSlidePrev: false,
  loop: true,
  navigation: false,
  onClick: (swiper) => {
    swiper.allowSlideNext = true;
    swiper.slideNext();
    swiper.allowSlideNext = false;
  },
  pagination: {
    clickable: false,
    dynamicBullets: true,
    dynamicMainBullets: 2,
  },
  slidesPerView: 1,
  spaceBetween: 0,
};
