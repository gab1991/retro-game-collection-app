import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

// import { EVideoType } from 'Store/gameDetailedReducer/types';
import { textMessages } from '../../Configs/appConfig';
import { CornerNotifier, ECornerNotifierCorners, WarnModal } from 'Components/UI/Modals';
import {
  ControlSection,
  EbaySection,
  GameInfoBox,
  ScreenshotSection,
  VideoSection,
} from 'Routes/GameDetailed/components';
import { getBoxArt } from 'Store/contentReducer/thunks';
import { flushGameDetailed, setIsOwned, setIsWished, setShowWisListWarn } from 'Store/gameDetailedReducer/actions';
import { selectGameDetailed } from 'Store/gameDetailedReducer/selectors';
import { addGame, getGameDetails, getScreenShots } from 'Store/gameDetailedReducer/thunks';
import { selectProfile } from 'Store/profileReducer/selectors';
import { removeGame } from 'Store/profileReducer/thunks';

import { useGameDetailedContext } from './context';

import styles from './GameDetailedPage.module.scss';

export function GameDetailedPage(): JSX.Element {
  const dispatch = useDispatch();
  const { platformName, slug, isMobile } = useGameDetailedContext();
  const {
    descriptionParsed,
    gameDetails,
    isOwned,
    isWished,
    showOwnedNotifier,
    showWishListWarn,
    showWishNotifier,
  } = useSelector(selectGameDetailed);
  const profileInfo = useSelector(selectProfile);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(flushGameDetailed());
    };
  }, []);

  useEffect(() => {
    if (profileInfo && gameDetails) {
      const isInListChecker = () => {
        const listToCheck = ['owned_list', 'wish_list'];

        for (let i = 0; i < listToCheck.length; i++) {
          const currentList = listToCheck[i];
          const userPlatforms = profileInfo[currentList].platforms;
          let chosenPlatform;
          for (let i = 0; i < userPlatforms.length; i++) {
            if (platformName === userPlatforms[i].name) {
              chosenPlatform = userPlatforms[i];
            }
          }
          if (chosenPlatform) {
            const games = chosenPlatform.games;
            for (let i = 0; i < games.length; i++) {
              if (gameDetails.name === games[i].name) {
                if (currentList === 'owned_list') {
                  dispatch(setIsOwned(true));
                } else if (currentList === 'wish_list') {
                  dispatch(setIsWished(true));
                }
              }
            }
          }
        }
      };
      isInListChecker();
    }
  }, [profileInfo, gameDetails, platformName, dispatch]);

  useEffect(() => {
    batch(() => {
      dispatch(getGameDetails(slug));
      dispatch(getScreenShots(slug));
    });
  }, [slug, dispatch]);

  useEffect(() => {
    if (gameDetails) {
      dispatch(getBoxArt(platformName, gameDetails.name));
    }
  }, [gameDetails, platformName, dispatch]);

  const toggleList = (platform, gameDetails, list) => {
    if (list === 'wish_list') {
      dispatch(setIsWished(!isWished));
      isWished
        ? dispatch(removeGame(gameDetails.name, list, platform))
        : dispatch(addGame(gameDetails, list, platform));
    } else if (list === 'owned_list') {
      dispatch(setIsOwned(!isOwned));
      isOwned ? dispatch(removeGame(gameDetails.name, list, platform)) : dispatch(addGame(gameDetails, list, platform));
    }
  };

  const hideWarning = () => {
    dispatch(setShowWisListWarn(false));
  };

  const warnYesClickHandler = () => {
    toggleList(platformName, gameDetails, 'wish_list');
    dispatch(setShowWisListWarn(false));
  };

  const cornerNotifiers = [
    {
      linkDir: '/profile/WishList',
      linkText: 'Wish List',
      onCancelClick: () => toggleList(platformName, gameDetails, 'wish_list'),
      show: showWishNotifier,
    },
    {
      linkDir: '/profile/CollectionList',
      linkText: 'Owned List',
      onCancelClick: () => toggleList(platformName, gameDetails, 'owned_list'),
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
            // show={show} FIX IT LATER
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
