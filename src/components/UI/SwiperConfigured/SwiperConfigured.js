import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import './SwiperConfigured.scss';

SwiperCore.use([Navigation, Pagination]);

export default function SwiperConfigured(props) {
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
        dynamicMainBullets: true,
        dynamicBullets: 4,
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
