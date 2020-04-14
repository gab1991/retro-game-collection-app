import React, { useEffect, useState } from 'react';
import styles from './EbayLotSection.module.scss';
import EbaySwiper from '../../../../GameDetailed/EbaySection/EbaySwiper/EbaySwiper';
import Button from '../../../../UI/Buttons/Button/Button';
import Backend from '../../../../../Backend/Backend';

export default function EbyaLotSection(props) {
  const { game, platform } = props;
  const watchedEbayOffers = game.watchedEbayOffers.map((ebayCard) => ({
    itemId: ebayCard.id,
  }));
  const [showedItems, setShowedItems] = useState(
    watchedEbayOffers.length ? watchedEbayOffers : null
  );
  const [activeEbaylist, setActiveEbaylist] = useState(
    watchedEbayOffers.length ? 'Watched' : 'New Offers'
  );

  const swiperProps = {
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 15,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      //   dynamicBullets: true,
      // },
    },
    pagination: false,
    // navigation: false,
  };

  return (
    <div className={styles.EbyaLotSection}>
      <div className={styles.ButtonSection}>
        <Button
          txtContent={'Watched'}
          pressed={activeEbaylist === 'Watched' ? true : false}
          // onClick={}
        />
        <Button
          txtContent={'New Offers'}
          pressed={activeEbaylist === 'New Offers' ? true : false}

          // onClick={}
        />
        <Button
          txtContent={'Relevance'}
          pressed={activeEbaylist === 'Relevance' ? true : false}

          // onClick={}
        />
      </div>
      <div className={styles.EbaySection}>
        <EbaySwiper
          platform={platform}
          game={game.name}
          itemsToShow={showedItems}
          swiperProps={swiperProps}
        />
      </div>
    </div>
  );
}
