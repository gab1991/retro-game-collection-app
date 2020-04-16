import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { profile } from '../../../../../actions/actions';

import styles from './EbayLotSection.module.scss';
import EbaySwiper from '../../../../GameDetailed/EbaySection/EbaySwiper/EbaySwiper';
import GameBox from '../../../GameBoxContainer/GameBox/GameBox';
import ButtonNeon from '../../../../UI/Buttons/ButtonNeon/ButtonNeon';
import Backend from '../../../../../Backend/Backend';
import OvalSpinner from '../../../../UI/LoadingSpinners/OvalSpinner/OvalSpinner';

function EbyaLotSection(props) {
  const { userData, gameData, platform } = props;
  const dispatch = useDispatch();
  const watchedEbayOffers = gameData.watchedEbayOffers.map((ebayCard) => ({
    itemId: [ebayCard.id],
  }));
  const [showedItems, setShowedItems] = useState(
    watchedEbayOffers.length ? watchedEbayOffers : []
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
    let isSubscribed = true;
    const req = (sortBy) => {
      if (isSubscribed) setLoading(true);
      Backend.getEbayItems(platform, gameData.name, sortBy)
        .then((res) => {
          if (isSubscribed) {
            setLoading(false);
            setShowedItems(res[0].item);
          }
        })
        .catch((err) => {
          if (isSubscribed) setLoading(false);
        });
    };
    const getWatchList = () => {
      if (isSubscribed) setLoading(true);

      Backend.getGameWatchedCards(
        userData.username,
        userData.token,
        platform,
        gameData.name
      ).then((res) => {
        if (res.success) {
          const watchedEbayOffers = res.success.map((ebayCard) => ({
            itemId: [ebayCard.id],
          }));
          if (isSubscribed) {
            setShowedItems(watchedEbayOffers);
            setLoading(false);
          }
        } else setShowedItems([]);
        if (isSubscribed) setLoading(false);
      });
    };
    switch (activeEbaylist) {
      case 'New Offers':
        req('StartTimeNewest');
        break;
      case 'Relevance':
        req('BestMatch');
        break;
      case 'Lowest Price':
        req('PricePlusShippingLowest');
        break;
      case 'Watched':
        getWatchList();
        break;
    }
    if (activeEbaylist === 'New Offers') {
    }
    return () => {
      isSubscribed = false;
    };
  }, [activeEbaylist]);

  const toggleEbayList = (e) => {
    const desc = e.currentTarget.textContent;
    setActiveEbaylist(desc);
  };

  const stopWatchHandler = (itemId) => {
    console.log(itemId);
  };

  return (
    <div className={styles.EbyaLotSection}>
      <GameBox
        game={gameData}
        platform={platform}
        desc={false}
        scaling={false}
      />
      <div className={styles.ButtonSection}>
        <ButtonNeon
          txtContent={'Watched'}
          color={activeEbaylist === 'Watched' ? 'gray' : false}
          onClick={toggleEbayList}
        />
        <ButtonNeon
          txtContent={'Lowest Price'}
          color={activeEbaylist === 'Lowest Price' ? 'gray' : false}
          onClick={toggleEbayList}
        />
        <ButtonNeon
          txtContent={'New Offers'}
          color={activeEbaylist === 'New Offers' ? 'gray' : false}
          onClick={toggleEbayList}
        />
        <ButtonNeon
          txtContent={'Relevance'}
          color={activeEbaylist === 'Relevance' ? 'gray' : false}
          onClick={toggleEbayList}
        />
      </div>
      <div className={styles.EbaySection}>
        {!loading && showedItems.length > 0 && (
          <EbaySwiper
            numToShow={3}
            platform={platform}
            game={gameData.name}
            itemsToShow={showedItems}
            swiperProps={swiperProps}
            stopWatchCallBack={stopWatchHandler}
          />
        )}
        {!loading && showedItems.length === 0 && (
          <div className={styles.NoItemToShow}>
            <p>No item to show in this category</p>
          </div>
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

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile,
  };
}

export default connect(mapStateToProps)(EbyaLotSection);
