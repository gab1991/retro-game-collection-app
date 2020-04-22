import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './EbayLotSection.module.scss';
import EbaySwiper from '../../../../GameDetailed/EbaySection/EbaySwiper/EbaySwiper';
import GameBox from '../../../GameBoxContainer/GameBox/GameBox';
import ButtonNeon from '../../../../UI/Buttons/ButtonNeon/ButtonNeon';
import Backend from '../../../../../Backend/Backend';
import OvalSpinner from '../../../../UI/LoadingSpinners/OvalSpinner/OvalSpinner';
import CloseSvg from '../../../../UI/LogoSvg/CloseSvg/CloseSvg';
import WanrModal from '../../../../UI/Modals/WarnModal/WarnModal';
import KnobToggler from '../../../../UI/Togglers/KnobToggler/KnobToggler';
import { trimName } from '../../../../GameDetailed/GameInfoBox/GameInfoBox';

function EbyaLotSection(props) {
  const {
    userData,
    gameData,
    platform,
    index,
    removeFromArray,
    containerRef,
    showingEbay,
  } = props;
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
  const [removing, setRemoving] = useState();
  const [showWarn, setShowWarn] = useState();
  const [isEbayTogglerOn, setIsEbayTogglerOn] = useState(true);
  const ebaySectionRef = useRef();
  const swiperProps = {
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 15,
    },
    pagination: false,
    navigation: true,
  };

  useEffect(() => {
    console.log(containerRef.current.getBoundingClientRect());
    showingEbay(isEbayTogglerOn);
  }, [isEbayTogglerOn]);

  useEffect(() => {
    let isSubscribed = true;
    const req = (sortBy) => {
      if (isSubscribed) setLoading(true);
      Backend.getEbayItems(platform, gameData.name, sortBy)
        .then((res) => {
          if (isSubscribed) {
            setLoading(false);

            setShowedItems(res[0].item ? res[0].item : []);
          }
        })
        .catch((err) => {
          if (isSubscribed) setLoading(false);
        });
    };
    const getWatchList = () => {
      if (isSubscribed) setLoading(true);

      Backend.getGameWatchedCards(userData.token, platform, gameData.name).then(
        (res) => {
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
        }
      );
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

  const removeFromWishHandler = () => {
    setRemoving(true);
  };

  const stopWatchHandler = (itemId) => {
    console.log(itemId);
  };

  const animationEndHandler = (e) => {
    const animName = e.animationName;
    if (animName.includes('remove')) removeFromArray(index, gameData.name);
    // if (animName.includes('ebayHide'))
  };
  const knobEbayHandler = () => {
    console.log(isEbayTogglerOn);
    setIsEbayTogglerOn((prev) => !prev);
  };

  return (
    <div
      className={`${styles.EbyaLotSection} ${
        removing ? styles.Removing : null
      }`}
      onAnimationEnd={animationEndHandler}>
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
      <div className={styles.NameSection}>
        <div className={styles.NameBadge}>{trimName(gameData.name)}</div>
      </div>
      <div className={styles.KnobTogglerSection}>
        <KnobToggler
          checked={isEbayTogglerOn}
          width={'40px'}
          message={'Show ebay offers'}
          onChangeHandler={knobEbayHandler}
        />
      </div>
      {/* {isEbayTogglerOn && ( */}
      <div className={`${styles.EbaySection}`} ref={ebaySectionRef}>
        <div
          className={`${styles.EbaySectionWrapper}
${isEbayTogglerOn ? styles.EbaySectionShowed : styles.EbaySectionHidden}
        `}>
          {!loading && showedItems.length > 0 && (
            <EbaySwiper
              numToShow={1}
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
      {/* )} */}
      <div className={styles.CloseSvgWrapper} onClick={() => setShowWarn(true)}>
        <CloseSvg />
      </div>
      {showWarn && (
        <WanrModal
          message={`Do you really want to remove ${gameData.name}`}
          onBackdropClick={() => setShowWarn(false)}
          onYesClick={() => {
            removeFromWishHandler();
            setShowWarn(false);
          }}
          onNoClick={() => setShowWarn(false)}
        />
      )}
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
