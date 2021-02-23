import React from 'react';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import './SwiperConfigured.scss';

SwiperCore.use([Navigation, Pagination]);

interface ISwiperConfProps {
  className?: string;
  customSwiperProps?: SwiperOptions;
  images?: Array<string>;
  isMobile?: boolean;
  slides?: Array<JSX.Element | (({ isVisible: boolean }) => JSX.Element)>;
}

export function SwiperConfigured(props: ISwiperConfProps): JSX.Element {
  const { slides = [], images = [], customSwiperProps = {}, className, isMobile } = props;

  return (
    <Swiper
      className={className}
      spaceBetween={15}
      slidesPerView={'auto'}
      watchSlidesVisibility
      navigation={isMobile ? false : true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 4,
      }}
      {...customSwiperProps}
    >
      {slides.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item} alt={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
