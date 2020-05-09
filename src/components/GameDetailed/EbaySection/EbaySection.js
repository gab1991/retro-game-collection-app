import React, { useState, useEffect } from 'react';
import styles from './EbaySection.module.scss';
import EbaySwiper from './EbaySwiper/EbaySwiper';
import Backend from '../../../Backend/Backend';
import DotSpinner from '../../UI/LoadingSpinners/DotSpinner/DotSpinner';
import sliderArrow from '../../../assets/images/ui/slider-arrow-left.svg';

export default function EbaySection(props) {
  const { game, platform, isMobile } = props;
  const [ebayItems, setEbayItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubcribed = true;
    if (isSubcribed) setLoading(true);
    Backend.getEbayItems(platform, game)
      .then((res) => {
        if (isSubcribed) {
          setEbayItems(res[0].item ? res[0].item : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isSubcribed) setLoading(false);
      });
    return () => {
      isSubcribed = false;
    };
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
  };

  return (
    <div className={styles.EbaySection}>
      {!loading && ebayItems.length > 0 && (
        <EbaySwiper
          platform={platform}
          game={game}
          itemsToShow={ebayItems}
          swiperProps={swiperProps}
          numToShow={4}
        />
      )}
      {!loading && ebayItems.length === 0 && (
        <div className={styles.NoItems}>
          <h1>No lots have been found</h1>
        </div>
      )}
      {loading && (
        <div className={styles.LoadingSpinner}>
          <div className={styles.LoadingSvgWrapper}>
            <DotSpinner />
          </div>
        </div>
      )}
    </div>
  );
}
