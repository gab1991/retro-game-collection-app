import React from 'react';
import { useSelector } from 'react-redux';
import SwiperCore, { Navigation, Pagination, Virtual } from 'swiper';

import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';
import './SwiperConfigured.scss';

SwiperCore.use([Navigation, Pagination, Virtual]);

interface ISwiperConfProps {
  className?: string;
  customSwiperProps?: Swiper;
  slides?: TSwiperConfiguredSlides;
  virtual?: boolean;
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
  const { slides = [], customSwiperProps = {}, className, virtual = false } = props;
  const isMobile = useSelector(selectIsMobile);

  return (
    <Swiper
      className={className}
      spaceBetween={15}
      slidesPerView={'auto'}
      virtual={
        virtual
          ? {
              slides,
            }
          : false
      }
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
        <SwiperSlide key={index} virtualIndex={index}>
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
