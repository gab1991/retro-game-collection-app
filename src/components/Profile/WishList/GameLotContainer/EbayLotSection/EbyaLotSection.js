import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { toggleEbayVisibility } from '../../../../../Store/Actions/profileActions';
import { trimName } from '../../../../../Utils/helperFunctions';
import EbaySection from '../../../../GameDetailed/EbaySection/EbaySection';
import WanrModal from '../../../../UI/Modals/WarnModal/WarnModal';
import KnobToggler from '../../../../UI/Togglers/KnobToggler/KnobToggler';
import GameBox from '../../../CollictionList/GameBoxContainer/GameBox/GameBox';
import { ButtonNeon } from 'Components/UI';
import { CloseSvg } from 'Components/UI/LogoSvg';

import styles from './EbayLotSection.module.scss';

const buttonsToSortOrder = {
  Watched: 'Watched',
  'Lowest Price': 'PricePlusShippingLowest',
  'New Offers': 'StartTimeNewest',
  Relevance: 'BestMatch',
};

function EbayLotSection(props) {
  const dispatch = useDispatch();
  const {
    gameData,
    gameData: { name: gameName, isShowEbay },
    platform,
  } = props;

  const [removing, setRemoving] = useState();
  const [showWarn, setShowWarn] = useState();
  const [isEbayTogglerOn, setIsEbayTogglerOn] = useState(isShowEbay);
  const isEbayLoading = useSelector((state) => state.wishList?.[platform]?.[gameName]?.isEbayLoading);
  const watchedEbayCards = useSelector((state) => state.ebayItems?.[platform]?.[gameName]?.['Watched']) || [];
  const [activeEbaylist, setActiveEbaylist] = useState(watchedEbayCards.length ? 'Watched' : 'New Offers');

  useEffect(() => {
    dispatch(toggleEbayVisibility(gameName, platform, isEbayTogglerOn));
  }, [isEbayTogglerOn]);

  const toggleEbayList = (e) => {
    const desc = e.currentTarget.textContent;
    setActiveEbaylist(desc);
    setIsEbayTogglerOn(true);
  };

  const removeFromWishHandler = () => {
    setRemoving(true);
  };

  const knobEbayHandler = () => {
    setIsEbayTogglerOn((prev) => !prev);
  };

  return (
    <div className={`${styles.EbyaLotSection} ${removing ? styles.Removing : null}`}>
      <GameBox className={styles.Gamebox} game={gameData} platform={platform} showDesc={false} scaling={false} />
      <div className={styles.ButtonSection}>
        {Object.keys(buttonsToSortOrder).map((btn) => (
          <ButtonNeon
            key={btn}
            txtContent={btn}
            onClick={toggleEbayList}
            color={activeEbaylist === btn && isEbayTogglerOn ? 'gray' : ''}
          />
        ))}
      </div>
      <div className={styles.NameSection}>
        <div className={styles.NameBadge}>{trimName(gameName)}</div>
      </div>
      <div className={styles.KnobTogglerSection}>
        <KnobToggler
          checked={isEbayTogglerOn}
          width={'40px'}
          labelTxt={'Show ebay offers'}
          onChangeHandler={knobEbayHandler}
        />
      </div>
      <div className={`${styles.EbaySection} ${isEbayTogglerOn ? styles.Expand : ''}`}>
        {isEbayTogglerOn && (
          <EbaySection
            className={styles.EbaySectionSwiper}
            game={gameName}
            platform={platform}
            isLoading={isEbayLoading}
            isMobile={false}
            sortOrder={buttonsToSortOrder[activeEbaylist]}
            fromComponent={'WishList'}
            customSwiperProps={{ pagination: false }}
          />
        )}
      </div>
      <div className={styles.CloseSvgWrapper} onClick={() => setShowWarn(true)}>
        <CloseSvg />
      </div>
      {showWarn && (
        <WanrModal
          message={`Do you really want to remove ${gameName}`}
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

export default connect(mapStateToProps)(EbayLotSection);
