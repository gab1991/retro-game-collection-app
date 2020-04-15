import React, { useEffect, useState } from 'react';
import styles from './EbayLotSection.module.scss';
import EbaySwiper from '../../../../GameDetailed/EbaySection/EbaySwiper/EbaySwiper';
import Button from '../../../../UI/Buttons/Button/Button';
import Backend from '../../../../../Backend/Backend';
import OvalSpinner from '../../../../UI/LoadingSpinners/OvalSpinner/OvalSpinner';

export default function EbyaLotSection(props) {
  const { gameData, platform } = props;
  const watchedEbayOffers = gameData.watchedEbayOffers.map((ebayCard) => ({
    itemId: [ebayCard.id],
  }));
  const [showedItems, setShowedItems] = useState(
    watchedEbayOffers.length ? watchedEbayOffers : null
  );
  const [activeEbaylist, setActiveEbaylist] = useState(
    watchedEbayOffers.length ? 'Watched' : 'New Offers'
  );
  const [loading, setLoading] = useState(false);
  const swiperProps = {
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 15,
    },
    pagination: false,
    navigation: true,
  };

  useEffect(() => {
    console.log(showedItems);
  }, [showedItems]);

  useEffect(() => {
    const req = (sortBy) => {
      setLoading(true);
      Backend.getEbayItems(platform, gameData.name, sortBy)
        .then((res) => {
          setLoading(false);
          setShowedItems(res[0].item);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    switch (activeEbaylist) {
      case 'New Offers':
        req('BestMatch');
        break;
      case 'Relevance':
        req(activeEbaylist);
        break;
      case 'Watched':
        setShowedItems(watchedEbayOffers);
        break;
    }
    if (activeEbaylist === 'New Offers') {
    }
  }, [activeEbaylist]);

  const toggleEbayList = (e) => {
    const desc = e.currentTarget.textContent;
    setActiveEbaylist(desc);
  };

  return (
    <div className={styles.EbyaLotSection}>
      <div className={styles.ButtonSection}>
        <Button
          txtContent={'Watched'}
          pressed={activeEbaylist === 'Watched' ? true : false}
          onClick={toggleEbayList}
        />
        <Button
          txtContent={'New Offers'}
          pressed={activeEbaylist === 'New Offers' ? true : false}
          onClick={toggleEbayList}
        />
        <Button
          txtContent={'Relevance'}
          pressed={activeEbaylist === 'Relevance' ? true : false}
          onClick={toggleEbayList}
        />
      </div>
      <div className={styles.EbaySection}>
        {!loading && (
          <EbaySwiper
            numToShow={5}
            platform={platform}
            game={gameData.name}
            itemsToShow={showedItems}
            swiperProps={swiperProps}
          />
        )}
        {loading && (
          <div className={styles.LoadingSvgWrapper}>
            <OvalSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
