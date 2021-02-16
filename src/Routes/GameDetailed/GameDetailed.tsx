import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EVideoType } from 'Store/gameDetailedReducer/types';

import { textMessages } from '../../Configs/appConfig';
import EbaySection from './EbaySection/EbaySection';
import { OvalSpinner } from 'Components/UI';
import { ArrowEsc } from 'Components/UI/LogoSvg';
import { CornerNotifier, ECornerNotifierCorners, WarnModal } from 'Components/UI/Modals';
import { TPlatformNames } from 'Configs/appConfig';
import { ControlSection, GameInfoBox, ScreenshotSection } from 'Routes/GameDetailed/components';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { getBoxArt } from 'Store/contentReducer/thunks';
import {
  flushGameDetailed,
  setIsOwned,
  setIsWished,
  setShowWisListWarn,
  toggleElmVisibility,
} from 'Store/gameDetailedReducer/actions';
import { selectGameDetailed } from 'Store/gameDetailedReducer/selectors';
import { addGame, getGameDetails, getScreenShots, getVideo } from 'Store/gameDetailedReducer/thunks';
import { selectProfile } from 'Store/profileReducer/selectors';
import { removeGame } from 'Store/profileReducer/thunks';

import styles from './GameDetailed.module.scss';

export function GameDetailed(): JSX.Element {
  const dispatch = useDispatch();
  const {
    descriptionParsed,
    uploadableElms: { ebaySection, gameplayVideo, soundtrackVideo },
    gameDetails,
    isOwned,
    isWished,
    showOwnedNotifier,
    showWishListWarn,
    showWishNotifier,
  } = useSelector(selectGameDetailed);
  const profileInfo = useSelector(selectProfile);
  const isMobile = useSelector(selectIsMobile);
  const { gameSlug: slug, platformName } = useParams<{ gameSlug: string; platformName: TPlatformNames }>();

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
    dispatch(getGameDetails(slug));
    dispatch(getScreenShots(slug));
  }, [slug, dispatch]);

  useEffect(() => {
    if (gameDetails) {
      dispatch(getBoxArt(platformName, gameDetails.name));
    }
  }, [gameDetails, platformName, dispatch]);

  useEffect(() => {
    if (!gameDetails?.name) return;
    if (soundtrackVideo.show && !soundtrackVideo.url) {
      dispatch(getVideo(EVideoType.soundtrack, platformName, gameDetails.name));
    }
    if (gameplayVideo.show && !gameplayVideo.url) {
      dispatch(getVideo(EVideoType.gameplay, platformName, gameDetails.name));
    }
  }, [soundtrackVideo, gameplayVideo, gameDetails, platformName, dispatch]);

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

  const toggleBlockVisibilty = (e) => {
    const elm = e.currentTarget.getAttribute('data-elm');
    dispatch(toggleElmVisibility(elm));
  };

  const videoElms = [
    {
      className: styles.VideoSoundtrack,
      elm: 'soundtrackVideo',
      heading: 'Soundtrack',
      video: soundtrackVideo,
    },
    {
      className: styles.VideoGameplay,
      elm: 'gameplayVideo',
      heading: 'Gameplay',
      video: gameplayVideo,
    },
  ];

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
    <section className={styles.GameDetailed}>
      <div className={styles.GameDetailGridCont}>
        <ScreenshotSection className={styles.ScreenshotSection} />
        <div className={styles.InfoSection}>{gameDetails && <GameInfoBox gameDetails={gameDetails} />}</div>
        <div className={styles.DescSection}>
          <hr></hr>
          {!!descriptionParsed && descriptionParsed}
        </div>
        <ControlSection />
      </div>
      <div className={styles.VideoSection}>
        {videoElms.map(({ className, elm, heading, video }) => (
          <div className={className} key={elm}>
            <div className={`${styles.VideoLabel}`} data-elm={elm} onClick={(e) => toggleBlockVisibilty(e)}>
              <h2>{heading}</h2>
              {isMobile && (
                <div className={styles.DropDownSvgContainer}>
                  <ArrowEsc arrow={!video.show} />
                </div>
              )}
              <hr></hr>
            </div>
            {video.show && (
              <div className={styles.PlayerWrapper}>
                {!video.url && (
                  <div className={styles.OvalSpinnerWrapper}>
                    <OvalSpinner />
                  </div>
                )}
                {video.url && (
                  <ReactPlayer
                    url={video.url}
                    className={styles.ReactPlayer}
                    height='100%'
                    width='100%'
                    controls={true}
                    playing={false}
                    light
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.EbaySection}>
        <div className={styles.EbayLabel} data-elm='ebaySection' onClick={(e) => toggleBlockVisibilty(e)}>
          <h2>Ebay Offers</h2>
          {isMobile && (
            <div className={styles.DropDownSvgContainer}>
              <ArrowEsc arrow={!ebaySection.show} />
            </div>
          )}
          <hr></hr>
        </div>
        {gameDetails && ebaySection.show && (
          <EbaySection
            platform={platformName}
            game={gameDetails.name}
            isLoading={ebaySection.isLoading}
            className={styles.EbaySectionContent}
          />
        )}
      </div>
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
