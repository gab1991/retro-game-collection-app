import React, { useEffect, useState } from 'react';
import { trimName } from '../../../../../Utils/helperFunctions';
import EbaySection from '../../../../GameDetailed/EbaySection/EbaySection';
import { connect, useDispatch, useSelector } from 'react-redux';
import { toggleEbayVisibility } from '../../../../../Store/Actions/profileActions';
import { getEbayItems } from '../../../../../Store/Actions/wishListActions';
import SwiperConfigured from '../../../../UI/SwiperConfigured/SwiperConfigured';
import EbayItemCard from '../../../../GameDetailed/EbaySection/EbayItemCard/EbayItemCard';
import styles from './EbayLotSection.module.scss';
import GameBox from '../../../CollictionList/GameBoxContainer/GameBox/GameBox';
import ButtonNeon from '../../../../UI/Buttons/ButtonNeon/ButtonNeon';
import Backend from '../../../../../Backend/Backend';
import OvalSpinner from '../../../../UI/LoadingSpinners/OvalSpinner/OvalSpinner';
import CloseSvg from '../../../../UI/LogoSvg/CloseSvg/CloseSvg';
import WanrModal from '../../../../UI/Modals/WarnModal/WarnModal';
import KnobToggler from '../../../../UI/Togglers/KnobToggler/KnobToggler';

const btnTxtToSortedRulesMap = {
  Watched: 'Watched',
  'Lowest Price': 'PricePlusShippingLowest',
  'New Offers': 'StartTimeNewest',
  Relevance: 'BestMatch',
};

function EbyaLotSection(props) {
  const dispatch = useDispatch();
  const {
    userData,
    gameData,
    gameData: { name: gameName },
    platform,
    game,
    index,
    removeFromArray,
    showingEbay,
  } = props;

  const watchedEbayOffers = gameData.watchedEbayOffers.map((ebayCard) => ({
    itemId: [ebayCard.id],
  }));

  const [activeEbaylist, setActiveEbaylist] = useState(
    watchedEbayOffers.length ? 'New Offers' : 'New Offers'
  );
  const [removing, setRemoving] = useState();
  const [showWarn, setShowWarn] = useState();
  const [isEbayTogglerOn, setIsEbayTogglerOn] = useState(gameData.isShowEbay);

  useEffect(() => {
    dispatch(toggleEbayVisibility(gameData.name, platform, isEbayTogglerOn));
  }, [isEbayTogglerOn]);

  const toggleEbayList = (e) => {
    const desc = e.currentTarget.textContent;
    setActiveEbaylist(desc);

    setIsEbayTogglerOn((prev) => {
      if (prev === false) {
      }
      return true;
    });
  };

  const removeFromWishHandler = () => {
    setRemoving(true);
  };

  const animationEndHandler = (e) => {
    const animName = e.animationName;
    if (animName.includes('remove')) removeFromArray(index, gameData.name);
    if (animName.includes('ebayShow')) {
    }
    if (animName.includes('ebayHide')) {
    }
  };

  const knobEbayHandler = () => {
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
      <div className={`${styles.EbaySection}`}>
        <div
          className={`${styles.EbaySectionWrapper}
          ${
            isEbayTogglerOn
              ? styles.EbayOpenAnimation
              : styles.EbayCloseAnimation
          }
          ${isEbayTogglerOn ? styles.EbaySectionShowed : ''}
        `}>
          {isEbayTogglerOn && (
            <EbaySection
              game={gameName}
              platform={platform}
              isLoading={false}
              isMobile={false}
              sortOrder={btnTxtToSortedRulesMap[activeEbaylist]}
            />
          )}
        </div>
      </div>
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
