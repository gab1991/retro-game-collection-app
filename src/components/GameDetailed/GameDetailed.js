import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { showAuthModal } from '../../Store/Actions/modalActions';
import {
  getGameDetails,
  getScreenShots,
  getBoxArt,
  getVideo,
  toggleElmVisibility,
  setIsOwned,
  setIsWished,
  removeGame,
  addGame,
  setShowWisListWarn,
} from '../../Store/Actions/gameDetailedActions';
import { textMessages } from '../../Сonfigs/appConfig';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import WarnModal from '../UI/Modals/WarnModal/WarnModal';
import CornerNotifier from '../UI/Modals/CornerNotifier/CornerNotifier';
import EbaySection from './EbaySection/EbaySection';
import ArrowEsc from '../UI/LogoSvg/ArrowEscSvg/ArrowEsc';
import OvalSpinner from '../UI/LoadingSpinners/OvalSpinner/OvalSpinner';
import sliderArrow from '../../Assets/images/ui/slider-arrow-left.svg';
import styles from './GameDetailed.module.scss';
import 'react-dynamic-swiper/lib/styles.css';

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
    boxArtUrl,
    soundtrackVideo,
    gameplayVideo,
    ebaySection,
    isOwned,
    isWished,
    showOwnedNotifier,
    showWishNotifier,
    showWishListWarn,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profileInfo && gameDetails) isInListChecker();
  }, [profileInfo, gameDetails]);

  useEffect(() => {
    dispatch(getGameDetails(slug));
    dispatch(getScreenShots(slug));
  }, [slug]);

  useEffect(() => {
    if (gameDetails.name) {
      dispatch(getBoxArt(platformName, gameDetails.name));
    }
  }, [gameDetails, platformName]);

  useEffect(() => {
    if (soundtrackVideo.show && !soundtrackVideo.url) {
      dispatch(getVideo('soundtrack', platformName, gameDetails.name));
    }
    if (gameplayVideo.show && !gameplayVideo.url) {
      dispatch(getVideo('gameplay', platformName, gameDetails.name));
    }
  }, [soundtrackVideo, gameplayVideo]);

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

  const toggleList = (platform, gameDetails, list) => {
    if (list === 'wish_list') {
      dispatch(setIsWished(!isWished));
      isWished
        ? dispatch(removeGame(gameDetails, list, platform))
        : dispatch(addGame(gameDetails, list, platform));
    } else if (list === 'owned_list') {
      dispatch(setIsOwned(!isOwned));
      isOwned
        ? dispatch(removeGame(gameDetails, list, platform))
        : dispatch(addGame(gameDetails, list, platform));
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

  const swiperProps = {
    swiperOptions: {
      slidesPerView: 'auto',
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    },
    loop: true,
    pagination: false,
    navigation: isMobile ? false : true,

    prevButton: () => (
      <div className="swiper-button-prev">
        <img src={sliderArrow} alt="prev-btn" />
      </div>
    ),
    nextButton: () => (
      <div className="swiper-button-next">
        <img
          src={sliderArrow}
          alt="prev-btn"
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
    ),
  };

  const buttons = [
    {
      name: 'wishListBtn',
      disabled: userData ? false : true,
      color: isWished ? 'red' : 'green',
      txtContent: isWished ? 'Remove from Wishlist' : 'Add to Wishlist',
      onClick: () => toggleList(platformName, gameDetails, 'wish_list'),
      tooltip: !userData && {
        txtContent: `Need to be logged in to add games to the lists `,
        btnOnclick: showAuth,
      },
    },
    {
      name: 'ownedListBtn',
      disabled: userData ? false : true,
      color: isOwned ? 'red' : 'green',
      txtContent: isOwned ? 'Remove from Owned' : 'Owned',
      onClick: () => toggleList(platformName, gameDetails, 'owned_list'),
      tooltip: !userData && {
        txtContent: `Need to be logged in to add games to the lists `,
        btnOnclick: showAuth,
      },
    },
    {
      name: 'backBtn',
      color: 'gray',
      txtContent: 'Back',
      onClick: getBack,
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
      linkText: 'Wish List',
      linkDir: '/profile/WishList',
      onCancelClick: () =>
        toggleList(platformName, gameDetails, 'wish_list', 'removeGame'),
      show: showWishNotifier,
    },
    {
      linkText: 'Owned List',
      linkDir: '/profile/CollectionList',
      onCancelClick: () =>
        toggleList(platformName, gameDetails, 'owned_list', 'removeGame'),
      show: showOwnedNotifier,
    },
  ];

  return (
    <section className={styles.GameDetailed}>
      <div className={styles.GameDetailGridCont}>
        <div className={styles.ScreenshotSection}>
          <Swiper {...swiperProps}>
            {screenshots &&
              screenshots.map((image, index) => (
                <Slide key={index}>
                  <img src={image} alt={image}></img>
                </Slide>
              ))}
          </Swiper>
        </div>
        <div className={styles.InfoSection}>
          {gameDetails.name && (
            <GameInfoBox gameInfo={gameDetails} boxArt={boxArtUrl} />
          )}
        </div>
        <div className={styles.DescSection}>
          <hr></hr>
          {!!descriptionParsed && descriptionParsed}
        </div>
        <div className={styles.ContorlsSection}>
          <hr></hr>
          <div className={styles.ButtonsContainer}>
            {buttons.map(
              ({ disabled, color, txtContent, onClick, tooltip }) => (
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
              )
            )}
          </div>
          <hr></hr>
        </div>
      </div>
      <div className={styles.VideoSection}>
        {videoElms.map(({ className, elm, heading, video }) => (
          <div className={className} key={elm}>
            <div
              className={styles.VideoLabel}
              elm={elm}
              onClick={(e) => toggleBlockVisibilty(e)}>
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
                    height="100%"
                    width="100%"
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
        <div
          className={styles.EbayLabel}
          elm="ebaySection"
          onClick={(e) => toggleBlockVisibilty(e)}>
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
            isMobile={isMobile}
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
    userData: state.logged,
    profileInfo: state.profile,
    isMobile: state.appState.isMobile,
    screenshots: state.gameDetailed.screenshots,
    descriptionParsed: state.gameDetailed.descriptionParsed,
    gameDetails: state.gameDetailed.gameDetails,
    boxArtUrl: state.gameDetailed.boxArtUrl,
    soundtrackVideo: state.gameDetailed.uploadableElms.soundtrackVideo,
    gameplayVideo: state.gameDetailed.uploadableElms.gameplayVideo,
    ebaySection: state.gameDetailed.uploadableElms.ebaySection,
    isOwned: state.gameDetailed.isOwned,
    isWished: state.gameDetailed.isWished,
    showOwnedNotifier: state.gameDetailed.showOwnedNotifier,
    showWishNotifier: state.gameDetailed.showWishNotifier,
    showWishListWarn: state.gameDetailed.showWishListWarn,
  };
}

export default connect(mapStateToProps)(GameDetailed);
