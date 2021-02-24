import React from 'react';
import { useSelector } from 'react-redux';
import SwiperCore, { Navigation, Pagination, SwiperOptions } from 'swiper';

import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import './SwiperConfigured.scss';

SwiperCore.use([Navigation, Pagination]);

interface ISwiperConfProps {
  className?: string;
  customSwiperProps?: SwiperOptions;
  images?: Array<string>;
  slides?: TSwiperConfiguredSlides;
}

interface ISwiperRenderFnArgs {
  isActive?: boolean;
  isDuplicate?: boolean;
  isNext?: boolean;
  isPrev?: boolean;
  isVisible?: boolean;
}

export type TSwiperConfiguredSlides = Array<JSX.Element | ((args: ISwiperRenderFnArgs) => JSX.Element)>;

export function SwiperConfigured(props: ISwiperConfProps): JSX.Element {
  const { slides = [], images = [], customSwiperProps = {}, className } = props;
  const isMobile = useSelector(selectIsMobile);

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
