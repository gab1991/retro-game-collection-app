import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { IProfilePlatform } from 'Store/profileReducer/types';
import { DeepReadonly } from 'utility-types';

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
import { flushGameDetailed, setIsOwned, setIsWished, setShowWisListWarn } from 'Store/gameDetailedReducer/actions';
import { selectGameDetailed } from 'Store/gameDetailedReducer/selectors';
import { getGameDetails, getScreenShots } from 'Store/gameDetailedReducer/thunks';
import { selectProfile } from 'Store/profileReducer/selectors';
import { IRawgGameDetails } from 'Typings/RawgData';

import { useGameDetailedContext } from './context';

import styles from './GameDetailedPage.module.scss';

export function GameDetailedPage(): JSX.Element {
  const dispatch = useDispatch();
  const { platformName, slug, isMobile, toggleList } = useGameDetailedContext();
  const { descriptionParsed, gameDetails, showOwnedNotifier, showWishListWarn, showWishNotifier } = useSelector(
    selectGameDetailed
  );
  const profileInfo = useSelector(selectProfile);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(flushGameDetailed());
    };
  }, []);

  useEffect(() => {
    if (!(profileInfo && gameDetails)) return;

    const isInListChecker = () => {
      const listToCheck: EAvailableLists[] = [EAvailableLists.ownedList, EAvailableLists.wishList];

      for (let i = 0; i < listToCheck.length; i++) {
        const currentList = listToCheck[i];
        const userPlatforms = profileInfo[currentList].platforms;
        let chosenPlatform: null | DeepReadonly<IProfilePlatform> = null;

        for (const platform of userPlatforms) {
          if (platformName === platform.name) {
            chosenPlatform = platform;
          }
        }

        if (!chosenPlatform) return;

        const { games } = chosenPlatform;

        for (const game of games) {
          if (gameDetails.name !== game.name) continue;

          if (currentList === EAvailableLists.ownedList) {
            dispatch(setIsOwned(true));
          }
          if (currentList === EAvailableLists.wishList) {
            dispatch(setIsWished(true));
          }
        }
      }
    };
    isInListChecker();
  }, [profileInfo, gameDetails, platformName, dispatch]);

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
    toggleList(platformName, gameDetails as IRawgGameDetails, EAvailableLists.wishList);
    dispatch(setShowWisListWarn(false));
  };

  const cornerNotifiers = [
    {
      linkDir: '/profile/WishList',
      linkText: 'Wish List',
      onCancelClick: () => toggleList(platformName, gameDetails as IRawgGameDetails, EAvailableLists.wishList),
      show: showWishNotifier,
    },
    {
      linkDir: '/profile/CollectionList',
      linkText: 'Owned List',
      onCancelClick: () => toggleList(platformName, gameDetails as IRawgGameDetails, EAvailableLists.ownedList),
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
          {!!descriptionParsed && descriptionParsed}
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
