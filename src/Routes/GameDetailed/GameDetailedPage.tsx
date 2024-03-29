import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { textMessages } from '../../Configs/appConfig';
import { CornerNotifier, ECornerNotifierCorners, WarnModal } from 'Components/UI/Modals';
import { EAvailableLists } from 'Configs/appConfig';
import {
  ControlSection,
  EbaySection,
  GameInfoBox,
  ScreenshotSection,
  VideoSection,
} from 'Routes/GameDetailed/components';
import { flushGameDetailed, setShowWisListWarn } from 'Routes/GameDetailed/reducer/actions';
import { selectGameDetailed } from 'Routes/GameDetailed/reducer/selectors';
import { getGameDetails, getScreenShots } from 'Routes/GameDetailed/reducer/thunks';

import { useGameDetailedContext } from './context';

import styles from './GameDetailedPage.module.scss';

export function GameDetailedPage(): JSX.Element {
  const dispatch = useDispatch();
  const { platform, slug, isMobile, toggleList } = useGameDetailedContext();
  const { descriptionHtml, gameDetails, showOwnedNotifier, showWishListWarn, showWishNotifier } = useSelector(
    selectGameDetailed
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(flushGameDetailed());
    };
  }, [dispatch]);

  useEffect(() => {
    batch(() => {
      dispatch(getGameDetails(slug));
      dispatch(getScreenShots(slug));
    });
  }, [slug, dispatch]);

  const hideWarning = () => {
    dispatch(setShowWisListWarn(false));
  };

  const warnYesClickHandler = () => {
    gameDetails && toggleList(platform, gameDetails.name, EAvailableLists.wishList, slug);
    dispatch(setShowWisListWarn(false));
  };

  const cornerNotifiers = [
    {
      linkDir: '/profile/WishList',
      linkText: 'Wish List',
      onCancelClick: () => gameDetails && toggleList(platform, gameDetails.name, EAvailableLists.wishList, slug),
      show: showWishNotifier,
    },
    {
      linkDir: '/profile/CollectionList',
      linkText: 'Owned List',
      onCancelClick: () => gameDetails && toggleList(platform, gameDetails.name, EAvailableLists.ownedList, slug),
      show: showOwnedNotifier,
    },
  ];

  return (
    <section className={styles.GameDetailedPage}>
      <div className={styles.GameDetailGridCont}>
        <ScreenshotSection className={styles.ScreenshotSection} />
        <div className={styles.InfoSection}>{gameDetails && <GameInfoBox gameDetails={gameDetails} />}</div>
        <div className={styles.DescSection}>
          <hr></hr>
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml || '' }} />
        </div>
        <ControlSection />
      </div>
      <VideoSection />
      <EbaySection />
      {!isMobile &&
        cornerNotifiers.map(({ linkText, linkDir, onCancelClick, show }) => (
          <CornerNotifier
            key={linkDir}
            corner={ECornerNotifierCorners.bottomLeft}
            message={'Game has been added to your'}
            linkText={linkText}
            linkDir={linkDir}
            btnText={'Cancel'}
            onCancelClickCb={onCancelClick}
            show={show}
          />
        ))}
      {showWishListWarn && (
        <WarnModal
          message={textMessages?.fromWishToOwn}
          onBackdropClick={hideWarning}
          onNoClick={hideWarning}
          onYesClick={warnYesClickHandler}
        />
      )}
    </section>
  );
}
