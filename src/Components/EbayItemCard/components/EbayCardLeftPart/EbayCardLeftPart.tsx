import React from 'react';

import { DeepReadonly } from 'utility-types';

import { SwiperConfigured } from 'Components/UI';
import { EbayLogo } from 'Components/UI/LogoSvg';
import { Swiper } from 'swiper/react';
import { IEbayCardItemData } from 'Typings/EbayData';

import styles from './EbayCardLeftPart.module.scss';

interface IEbayCardLeftPartProps {
  itemData: DeepReadonly<IEbayCardItemData>;
}

export function EbayCardLeftPart(props: IEbayCardLeftPartProps): JSX.Element {
  const {
    itemData: { pictures, itemUrl },
  } = props;

  const slides = pictures.map((url) => <img src={url} key={url} alt={''} className={styles.slideImg}></img>);

  return (
    <div className={styles.ImgArea}>
      <SwiperConfigured slides={slides} customSwiperProps={swiperProps}></SwiperConfigured>
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
