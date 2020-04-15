import React, { useState, useEffect } from 'react';
import styles from './EbaySection.module.scss';
import EbaySwiper from './EbaySwiper/EbaySwiper';
import Backend from '../../../Backend/Backend';

export default function EbaySection(props) {
  const { game, platform } = props;
  const [ebayItems, setEbayItems] = useState();

  useEffect(() => {
    Backend.getEbayItems(platform, game).then((res) => {
      setEbayItems(res[0].item);
    });
  }, []);

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
    navigation: false,
  };

  return (
    <div className={styles.EbaySection}>
      <EbaySwiper
        platform={platform}
        game={game}
        itemsToShow={ebayItems}
        swiperProps={swiperProps}
        numToShow={4}
      />
    </div>
  );
}
