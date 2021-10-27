import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { EbaySwiper } from 'Components';

import { EEbaySortOrder } from 'Api/types';
import { IProfileGame } from 'Routes/Profile/reducer/types';
import { IRootState } from 'Store/types';
import { DeepReadonly } from 'utility-types';

import { ButtonNeon, KnobToggler } from 'Components/UI';
import { CloseSvg, SixDots } from 'Components/UI/LogoSvg';
import { WarnModal } from 'Components/UI/Modals';
import { TPlatformNames } from 'Configs/appConfig';
import { GameBox } from 'Routes/Profile/components';
import { toggleEbayVisibility } from 'Routes/Profile/reducer/thunks';
import { selectEbayCardItems } from 'Store/ebayItemsReducer/selectors';
import { trimName } from 'Utils/helperFunctions';

import styles from './EbayLotSection.module.scss';

const buttonsToSortOrder = {
  'Lowest Price': EEbaySortOrder['Lowest Price'],
  'New Offers': EEbaySortOrder['New Offers'],
  Relevance: EEbaySortOrder['Relevance'],
  Watched: EEbaySortOrder['Watched'],
} as const;

export interface IEbayLotSectionProps {
  children?: ReactNode;
  className?: string;
  game: DeepReadonly<IProfileGame>;
  onRemoveModalConfirm?: () => void;
  platform: TPlatformNames;
  showingEbay?: boolean;
}

export function EbayLotSection(props: IEbayLotSectionProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    game,
    game: { name: gameName, isShowEbay },
    platform,
    className,
    children,
    onRemoveModalConfirm,
  } = props;

  const [showWarn, setShowWarn] = useState(false);
  const [isEbayTogglerOn, setIsEbayTogglerOn] = useState(isShowEbay);
  const watchedEbayCards = useSelector((state: IRootState) =>
    selectEbayCardItems(state, { game: gameName, platform, sortOrder: EEbaySortOrder.Watched })
  );
  const initialEbayList =
    watchedEbayCards && watchedEbayCards.length ? EEbaySortOrder.Watched : EEbaySortOrder['New Offers'];

  const [activeEbaylist, setActiveEbaylist] = useState<EEbaySortOrder>(initialEbayList);

  useEffect(() => {
    dispatch(toggleEbayVisibility(gameName, platform, isEbayTogglerOn));
  }, [isEbayTogglerOn, gameName, platform, dispatch]);

  const toggleEbayList: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const desc = e.currentTarget.textContent;

    if (desc && Object.keys(buttonsToSortOrder).includes(desc)) {
      setActiveEbaylist(buttonsToSortOrder[desc]);
    }

    setIsEbayTogglerOn(true);
  };

  const onYesClick = () => {
    onRemoveModalConfirm && onRemoveModalConfirm();
    setShowWarn(false);
  };

  const knobEbayHandler = () => {
    setIsEbayTogglerOn((prev) => !prev);
  };

  return (
    <div className={cn(styles.EbyaLotSection, className)}>
      <GameBox className={styles.Gamebox} game={game} platform={platform} showDesc={false} scaling={false} />
      <div className={styles.ButtonSection}>
        {Object.keys(buttonsToSortOrder).map((btn) => (
          <ButtonNeon
            key={btn}
            onClick={toggleEbayList}
            color={activeEbaylist === buttonsToSortOrder[btn] && isEbayTogglerOn ? 'gray' : undefined}
          >
            {btn}
          </ButtonNeon>
        ))}
      </div>
      <p className={styles.NameBadge}>{trimName(gameName)}</p>
      <KnobToggler
        checked={isEbayTogglerOn}
        width='40px'
        onChange={knobEbayHandler}
        labelClassName={styles.KnobTogglerSection}
      >
        Show ebay offers
      </KnobToggler>
      <div className={cn(styles.EbaySwiper, { [styles.EbaySwiper_expand]: isEbayTogglerOn })}>
        {isEbayTogglerOn && (
          <EbaySwiper
            className={styles.EbaySectionSwiper}
            gameName={gameName}
            platform={platform}
            sortOrder={activeEbaylist}
            swiperProps={{ breakpoints: undefined, spaceBetween: 0 }}
          />
        )}
      </div>
      <div className={styles.ControlsSection}>{children || <SixDots className={cn(styles.sixDotsSvg)} />}</div>
      <button className={styles.closeBtn} onClick={() => setShowWarn(true)}>
        <CloseSvg />
      </button>
      {showWarn && (
        <WarnModal
          message={`Do you really want to remove ${gameName}`}
          onBackdropClick={() => setShowWarn(false)}
          onYesClick={onYesClick}
          onNoClick={() => setShowWarn(false)}
        />
      )}
    </div>
  );
}
