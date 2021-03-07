import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EbaySwiper } from 'Components';

import { EEbaySortOrder } from 'Backend/types';
import { IProfileGame } from 'Store/profileReducer/types';
import { IRootState } from 'Store/types';

import { ButtonNeon, KnobToggler } from 'Components/UI';
import { CloseSvg } from 'Components/UI/LogoSvg';
import { WarnModal } from 'Components/UI/Modals';
import { TPlatformNames } from 'Configs/appConfig';
import { GameBox } from 'Routes/Profile/components';
import { selectEbayCardItems } from 'Store/ebayItemsReducer/selectors';
import { toggleEbayVisibility } from 'Store/profileReducer/thunks';
import { trimName } from 'Utils/helperFunctions';

import styles from './EbayLotSection.module.scss';

const buttonsToSortOrder = {
  'Lowest Price': 'PricePlusShippingLowest',
  'New Offers': 'StartTimeNewest',
  Relevance: 'BestMatch',
  Watched: 'Watched',
};

interface IEbayLotSectionProps {
  gameData: IProfileGame;
  platform: TPlatformNames;
  showingEbay?: boolean;
}

export function EbayLotSection(props: IEbayLotSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    gameData,
    gameData: { name: gameName, isShowEbay },
    platform,
  } = props;

  const [removing, setRemoving] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [isEbayTogglerOn, setIsEbayTogglerOn] = useState(isShowEbay);
  const watchedEbayCards = useSelector((state: IRootState) =>
    selectEbayCardItems(state, { game: gameName, platform, sortOrder: EEbaySortOrder.Watched })
  );
  const [activeEbaylist, setActiveEbaylist] = useState(
    watchedEbayCards.length ? EEbaySortOrder.Watched : EEbaySortOrder['New Offers']
  );

  useEffect(() => {
    dispatch(toggleEbayVisibility(gameName, platform, isEbayTogglerOn));
  }, [isEbayTogglerOn]);

  const toggleEbayList: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const desc = e.currentTarget.textContent;
    if (desc && Object.keys(EEbaySortOrder).includes(desc)) {
      setActiveEbaylist(desc as EEbaySortOrder);
    }

    setIsEbayTogglerOn(true);
  };

  const removeFromWishHandler = () => {
    setRemoving(true);
  };

  const knobEbayHandler = () => {
    setIsEbayTogglerOn((prev) => !prev);
  };

  return (
    <div className={`${styles.EbyaLotSection} ${removing ? styles.Removing : ''}`}>
      <GameBox className={styles.Gamebox} game={gameData} platform={platform} showDesc={false} scaling={false} />
      <div className={styles.ButtonSection}>
        {Object.keys(buttonsToSortOrder).map((btn) => (
          <ButtonNeon
            key={btn}
            txtContent={btn}
            onClick={toggleEbayList}
            color={activeEbaylist === btn && isEbayTogglerOn ? 'gray' : undefined}
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
      <div className={`${styles.EbaySwiper} ${isEbayTogglerOn ? styles.Expand : ''}`}>
        {isEbayTogglerOn && (
          <EbaySwiper
            className={styles.EbaySectionSwiper}
            gameName={gameName}
            platform={platform}
            sortOrder={buttonsToSortOrder[activeEbaylist]}
            customSwiperProps={{ pagination: false }}
          />
        )}
      </div>
      <div
        className={styles.CloseSvgWrapper}
        onClick={() => setShowWarn(true)}
        onKeyPress={() => setShowWarn(true)}
        role={'button'}
        tabIndex={0}
      >
        <CloseSvg />
      </div>
      {showWarn && (
        <WarnModal
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
