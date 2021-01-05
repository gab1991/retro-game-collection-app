import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect, useDispatch, useSelector } from 'react-redux';

import { textMessages } from '../../Configs/appConfig';
import { removeGame } from '../../Store/Actions/profileActions';
import { showAuthModal, showCornerNotifier } from '../../Store/appStateReducer/actions';
import EbaySection from './EbaySection/EbaySection';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import { ButtonNeon, OvalSpinner, SwiperConfigured } from 'Components/UI';
import { ArrowEsc } from 'Components/UI/LogoSvg';
import { CornerNotifier, ECornerNotifierCorners, WarnModal } from 'Components/UI/Modals';
import { selectBoxArt } from 'Store/contentReducer/selectors';
import { getBoxArt } from 'Store/contentReducer/thunks';
import {
  flushGameDetailed,
  setIsOwned,
  setIsWished,
  setShowWisListWarn,
  toggleElmVisibility,
} from 'Store/gameDetailedReducer/actions';
import { addGame, getGameDetails, getScreenShots, getVideo } from 'Store/gameDetailedReducer/thunks';

import styles from './GameDetailed.module.scss';

function GameDetailed(props) {
  const dispatch = useDispatch();
  const { gameSlug: slug, platformName } = props?.match?.params || {};
  const {
    userData,
    profileInfo,
    isMobile,
    screenshots,
    descriptionParsed,
    gameDetails,
    soundtrackVideo,
    gameplayVideo,
    ebaySection,
    isOwned,
    isWished,
    isEbayLoading,
    showOwnedNotifier,
    showWishNotifier,
    showWishListWarn,
  } = props;
  const boxArtUrl = useSelector((state) => (gameDetails ? selectBoxArt(state, platformName, gameDetails.name) : ''));

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => dispatch(flushGameDetailed());
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
    if (soundtrackVideo.show && !soundtrackVideo.url) {
      dispatch(getVideo('soundtrack', platformName, gameDetails.name));
    }
    if (gameplayVideo.show && !gameplayVideo.url) {
      dispatch(getVideo('gameplay', platformName, gameDetails.name));
    }
  }, [soundtrackVideo, gameplayVideo, gameDetails, platformName, dispatch]);

  const toggleList = (platform, gameDetails, list) => {
    if (list === 'wish_list') {
      dispatch(setIsWished(!isWished));
      isWished ? dispatch(removeGame(gameDetails, list, platform)) : dispatch(addGame(gameDetails, list, platform));
    } else if (list === 'owned_list') {
      dispatch(setIsOwned(!isOwned));
      isOwned ? dispatch(removeGame(gameDetails, list, platform)) : dispatch(addGame(gameDetails, list, platform));
    }
  };

  const getBack = () => {
    props.history.goBack();
  };

  const hideWarning = () => {
    dispatch(setShowWisListWarn(false));
  };

  const warnYesClickHandler = () => {
    toggleList(platformName, gameDetails, 'wish_list');
    dispatch(setShowWisListWarn(false));
  };

  const toggleBlockVisibilty = (e) => {
    const elm = e.currentTarget.getAttribute('elm');
    dispatch(toggleElmVisibility(elm));
  };

  const showAuth = () => {
    dispatch(showAuthModal(true));
  };

  const buttons = [
    {
      color: isWished ? 'red' : 'green',
      disabled: userData ? false : true,
      name: 'wishListBtn',
      onClick: () => toggleList(platformName, gameDetails, 'wish_list'),
      tooltip: !userData && {
        btnOnclick: showAuth,
        txtContent: `Need to be logged in to add games to the lists `,
      },
      txtContent: isWished ? 'Remove from Wishlist' : 'Add to Wishlist',
    },
    {
      color: isOwned ? 'red' : 'green',
      disabled: userData ? false : true,
      name: 'ownedListBtn',
      onClick: () => toggleList(platformName, gameDetails, 'owned_list'),
      tooltip: !userData && {
        btnOnclick: showAuth,
        txtContent: `Need to be logged in to add games to the lists `,
      },
      txtContent: isOwned ? 'Remove from Owned' : 'Owned',
    },
    {
      color: 'gray',
      name: 'backBtn',
      onClick: getBack,
      txtContent: 'Back',
    },
  ];

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
      onCancelClick: () => toggleList(platformName, gameDetails, 'wish_list', 'removeGame'),
      show: showWishNotifier,
    },
    {
      linkDir: '/profile/CollectionList',
      linkText: 'Owned List',
      onCancelClick: () => toggleList(platformName, gameDetails, 'owned_list', 'removeGame'),
      show: showOwnedNotifier,
    },
  ];

  console.log({ cornerNotifiers, isMobile });
  return (
    <section className={styles.GameDetailed}>
      <div className={styles.GameDetailGridCont}>
        <div className={styles.ScreenshotSection}>
          <SwiperConfigured
            images={screenshots}
            isMobile={isMobile}
            customSwiperProps={{
              loop: true,
              loopedSlides: 3,
              pagination: false,
              spaceBetween: 0,
            }}
          />
        </div>
        <div className={styles.InfoSection}>
          {gameDetails && <GameInfoBox gameInfo={gameDetails} boxArt={boxArtUrl} />}
        </div>
        <div className={styles.DescSection}>
          <hr></hr>
          {!!descriptionParsed && descriptionParsed}
        </div>
        <div className={styles.ContorlsSection}>
          <hr></hr>
          <div className={styles.ButtonsContainer}>
            {buttons.map(({ disabled, color, txtContent, onClick, tooltip }) => (
              <div className={styles.ButtonNeonWrapper} key={txtContent}>
                <ButtonNeon
                  className={styles.ButtonNeon}
                  disabled={disabled}
                  color={color}
                  txtContent={txtContent}
                  onClick={onClick}
                />
                {tooltip && (
                  <div className={styles.ButtonTooltip}>
                    {tooltip.txtContent}
                    <button onClick={tooltip.btnOnclick}>GO TO LOGIN</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr></hr>
        </div>
      </div>
      <div className={styles.VideoSection}>
        {videoElms.map(({ className, elm, heading, video }) => (
          <div className={className} key={elm}>
            <div className={`${styles.VideoLabel}`} elm={elm} onClick={(e) => toggleBlockVisibilty(e)}>
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
        <div className={styles.EbayLabel} elm='ebaySection' onClick={(e) => toggleBlockVisibilty(e)}>
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
            isLoading={isEbayLoading}
            className={styles.EbaySectionContent}
          />
        )}
      </div>
      {!isMobile &&
        cornerNotifiers.map(({ linkText, linkDir, onCancelClick, show }) => (
          <CornerNotifier
            key={linkDir}
            corner={'bottomLeft'}
            message={'Game has been added to your'}
            linkText={linkText}
            linkDir={linkDir}
            btnText={'Cancel'}
            onCancelClick={onCancelClick}
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

function mapStateToProps(state) {
  return {
    boxArtUrl: state.gameDetailed.boxArtUrl,
    descriptionParsed: state.gameDetailed.descriptionParsed,
    ebaySection: state.gameDetailed.uploadableElms.ebaySection,
    gameDetails: state.gameDetailed.gameDetails,
    gameplayVideo: state.gameDetailed.uploadableElms.gameplayVideo,
    isEbayLoading: state.gameDetailed.uploadableElms.ebaySection.isLoading,
    isMobile: state.appState.isMobile,
    isOwned: state.gameDetailed.isOwned,
    isWished: state.gameDetailed.isWished,
    profileInfo: state.profile,
    screenshots: state.gameDetailed.screenshots,
    showOwnedNotifier: state.gameDetailed.showOwnedNotifier,
    showWishListWarn: state.gameDetailed.showWishListWarn,
    showWishNotifier: state.gameDetailed.showWishNotifier,
    soundtrackVideo: state.gameDetailed.uploadableElms.soundtrackVideo,
    userData: state.logged.username,
  };
}

export default connect(mapStateToProps)(GameDetailed);
