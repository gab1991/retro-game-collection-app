import React from 'react';
import { Swiper, Slide } from 'react-dynamic-swiper';
import sliderArrow from '../../../Assets/images/ui/slider-arrow-left.svg';
import styles from './SwiperConfigured.module.scss';
import 'react-dynamic-swiper/lib/styles.css';

export default function SwiperConfigured(props) {
  const {
    slides = [],
    isMobile = false,
    customSwiperProps = {},
    reactElms = [],
    onActive,
    className,
  } = props;

  const swiperProps = {
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    },
    loop: true,
    pagination: false,
    navigation: isMobile ? false : true,

    prevButton: () => (
      <div className="swiper-button-prev">
        <img src={sliderArrow} alt="prev-btn" />
      </div>
    ),
    nextButton: () => (
      <div className="swiper-button-next">
        <img
          src={sliderArrow}
          alt="prev-btn"
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
    ),
    onTouchMove: () => console.log('asd'),
  };

  const combinedProps = { ...swiperProps, ...customSwiperProps };

  return (
    <Swiper {...combinedProps} className={`${styles.Swiper} ${className}`}>
      {reactElms.map(({ type: Elm, props }, index) => (
        <Slide key={index} onActive={onActive}>
          <Elm {...props} />
        </Slide>
      ))}
      {slides.map((image, index) => (
        <Slide key={index} onActive={onActive}>
          <img src={image} alt={image}></img>
        </Slide>
      ))}
    </Swiper>
  );
}
