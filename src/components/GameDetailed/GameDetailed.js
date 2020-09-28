import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  showAuthModal,
  showErrModal,
  hideErrModal,
} from '../../Actions/actions';
import styles from './GameDetailed.module.scss';
import Backend from '../../Backend/Backend';
import { textMessages } from '../../Сonfigs/appConfig';
import useWindowSize from '../../CustomHooks/useWindowSize';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import WarnModal from '../UI/Modals/WarnModal/WarnModal';
import CornerNotifier from '../UI/Modals/CornerNotifier/CornerNotifier';
import EbaySection from './EbaySection/EbaySection';
import ReactPlayer from 'react-player';
import ArrowEsc from '../UI/LogoSvg/ArrowEscSvg/ArrowEsc';
import OvalSpinner from '../UI/LoadingSpinners/OvalSpinner/OvalSpinner';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
import sliderArrow from '../../Assets/images/ui/slider-arrow-left.svg';
import sassVar from '../../Сonfigs/Variables.scss';

const mobileBreakPointWidth = parseInt(sassVar['breakpoints-mobile']);

function GameDetailed(props) {
  const dispatch = useDispatch();
  const slug = props.match.params.gameSlug;
  const platformName = props.match.params.platformName;
  const { userData, profileInfo } = props;
  const [gameDetails, setGameDetails] = useState();
  const [screenshots, setScreenshots] = useState();
  const [boxArtUrl, setBoxArtUrl] = useState();
  const [sountrackVideo, setSountrackVideo] = useState();
  const [gameplayVideo, setGameplayVideo] = useState();
  const [elmsVisibility, setElmsVisibility] = useState({
    sountrackVideo: true,
    gameplayVideo: true,
    ebaySection: true,
  });
  const [isOwned, setisOwned] = useState(false);
  const [isWished, setisWished] = useState(false);
  const [descriptionParsed, setDescriptionParsed] = useState();
  const [showWishWarn, setShowWishListWarn] = useState(false);
  const [showWishNotifier, setShowWishNotifier] = useState(false);
  const [showOwnedhNotifier, setShowOwnedNotifier] = useState(false);
  const wishListWarnTxt = textMessages.fromWishToOwn;
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  let wishNotifierTimer;
  let ownedNotifierTimer;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => clearInterval(wishNotifierTimer);
  }, [wishNotifierTimer]);
  useEffect(() => {
    return () => clearInterval(ownedNotifierTimer);
  }, [ownedNotifierTimer]);

  useEffect(() => {
    if (windowSize.width < mobileBreakPointWidth) {
      setIsMobile(true);

      const updVisibility = { ...elmsVisibility };
      for (let el in updVisibility) {
        updVisibility[el] = false;
      }
      setElmsVisibility({ ...updVisibility });
    }
  }, [windowSize]);

  useEffect(() => {
    if (profileInfo && gameDetails) isInListChecker();
  }, [profileInfo, gameDetails]);

  useEffect(() => {
    let isSubscribed = true;
    Backend.getGameDetails(slug).then((res) => {
      const description = res.description;
      if (isSubscribed) {
        setGameDetails(res);
        setDescriptionParsed(ReactHtmlParser(description));
      }
    });

    Backend.getScreenshots(slug).then((res) => {
      const screenshotsUrls = [];
      res.results.forEach((obj) => screenshotsUrls.push(obj.image));
      if (isSubscribed) setScreenshots(screenshotsUrls);
    });

    return () => {
      isSubscribed = false;
    };
  }, [slug]);

  useEffect(() => {
    let isSubscribed = true;
    if (gameDetails) {
      Backend.getBoxArt(platformName, gameDetails.name)
        .then((res) => {
          if (isSubscribed) setBoxArtUrl(res);
        })
        .catch((err) => console.log(err));

      if (elmsVisibility.sountrackVideo && !sountrackVideo) {
        Backend.getVideo('sountrack', platformName, gameDetails.name).then(
          (res) => {
            if (isSubscribed) setSountrackVideo(res);
          }
        );
      }

      if (elmsVisibility.gameplayVideo && !gameplayVideo) {
        Backend.getVideo('gameplay', platformName, gameDetails.name).then(
          (res) => {
            if (isSubscribed) setGameplayVideo(res);
          }
        );
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [gameDetails, platformName, elmsVisibility]);

  const notifierHandler = (listState, listName) => {
    if (listState === false) {
      if (listName === 'wish_list') {
        setShowWishNotifier(!showWishNotifier);
        wishNotifierTimer = setTimeout(() => {
          setShowWishNotifier(false);
        }, 2000);
      } else if (listName === 'owned_list') {
        setShowOwnedNotifier(!showOwnedhNotifier);
        ownedNotifierTimer = setTimeout(() => {
          setShowOwnedNotifier(false);
        }, 2000);
      }
    }
  };

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
              setisOwned(true);
            } else if (currentList === 'wish_list') {
              setisWished(true);
            }
          }
        }
      }
    }
  };

  const closeErrModal = () => {
    dispatch(hideErrModal());
  };

  const toggleList = (platform, gameDetails, list, action) => {
    const notifierBlock = needToShowWarning(list);
    const token = props.userData.token;
    let prevState;

    if (list === 'wish_list')
      setisWished((prevWish) => {
        prevState = prevWish;
        return !prevWish;
      });
    if (list === 'owned_list')
      setisOwned((prevOwned) => {
        prevState = prevOwned;
        return !prevOwned;
      });

    if (!action) {
      if (list === 'owned_list') {
        action = isOwned ? 'removeGame' : 'addGame';
      } else if (list === 'wish_list') {
        action = isWished ? 'removeGame' : 'addGame';
      }
    }

    Backend.updateProfile(token, {
      action: action,
      list: list,
      platform: platform,
      game: gameDetails,
    })
      .then((res) => {
        if (list === 'owned_list') {
          if (!notifierBlock) notifierHandler(prevState, list);
        } else if (list === 'wish_list') {
          if (!notifierBlock) notifierHandler(prevState, list);
        }
      })
      .catch((err) => {
        dispatch(
          showErrModal({
            message: 'Something wrong happened.Try again later',
            onBackdropClick: closeErrModal,
            onBtnClick: closeErrModal,
          })
        );
        if (list === 'wish_list')
          setisWished((prevWish) => {
            prevState = prevWish;
            return !prevWish;
          });
        if (list === 'owned_list')
          setisOwned((prevOwned) => {
            prevState = prevOwned;
            return !prevOwned;
          });
      });
  };

  const getBack = () => {
    props.history.goBack();
  };

  const hideWarning = () => {
    setShowWishListWarn(false);
  };

  const needToShowWarning = (list) => {
    if (list === 'owned_list' && isWished && !isOwned) {
      setShowWishListWarn(true);
      return true;
    } else return false;
  };

  const wishListWarnHandler = () => {
    toggleList(platformName, gameDetails, 'wish_list', 'removeGame');
    setShowWishListWarn(false);
  };

  const toggleBlockVisibilty = (e) => {
    const elm = e.currentTarget.getAttribute('elm');
    const updVisibility = { ...elmsVisibility };
    updVisibility[elm] = !updVisibility[elm];
    setElmsVisibility(updVisibility);
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

  return (
    <div className={styles.GameDetailed}>
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
          {gameDetails && (
            <GameInfoBox gameInfo={gameDetails} boxArt={boxArtUrl} />
          )}
        </div>
        <div className={styles.DescSection}>
          <hr></hr>
          {descriptionParsed ? descriptionParsed : null}
        </div>
        <div className={styles.ContorlsSection}>
          <hr></hr>
          <div className={styles.ButtonsContainer}>
            <div className={styles.ButtonWrapper}>
              <ButtonNeon
                disabled={userData ? false : true}
                color={isWished ? 'red' : 'green'}
                txtContent={
                  isWished ? 'Remove from Wishlist' : 'Add to Wishlist'
                }
                onClick={() =>
                  toggleList(platformName, gameDetails, 'wish_list')
                }
              />
              {!userData && (
                <div className={styles.ButtonTooltip}>
                  {`Need to be logged in to add games to the lists    `}
                  <button onClick={showAuth}>GO TO LOGIN</button>
                </div>
              )}
            </div>
            <div className={styles.ButtonWrapper}>
              <ButtonNeon
                disabled={userData ? false : true}
                color={isOwned ? 'red' : 'green'}
                txtContent={isOwned ? 'Remove from Owned' : 'Owned'}
                onClick={() =>
                  toggleList(platformName, gameDetails, 'owned_list')
                }
              />
              {!userData && (
                <div className={styles.ButtonTooltip}>
                  {`Need to be logged in to add games to the lists    `}
                  <button onClick={showAuth}>GO TO LOGIN</button>
                </div>
              )}
            </div>
            <div className={styles.ButtonWrapper}>
              <ButtonNeon txtContent={'Back'} onClick={getBack} color="gray" />
            </div>
            {showWishWarn && (
              <WarnModal
                message={wishListWarnTxt}
                onBackdropClick={hideWarning}
                onNoClick={hideWarning}
                onYesClick={wishListWarnHandler}
              />
            )}
          </div>
          <hr></hr>
        </div>
      </div>
      <div className={styles.VideoSection}>
        <div className={styles.VideoSoundtrack}>
          <div
            className={styles.VideoLabel}
            elm="sountrackVideo"
            onClick={(e) => toggleBlockVisibilty(e)}>
            <h2>Soundtrack</h2>
            {isMobile && (
              <div className={styles.DropDownSvgContainer}>
                <ArrowEsc arrow={!elmsVisibility.sountrackVideo} />
              </div>
            )}
            <hr></hr>
          </div>
          {elmsVisibility.sountrackVideo && (
            <div className={styles.PlayerWrapper}>
              {!sountrackVideo && (
                <div className={styles.OvalSpinnerWrapper}>
                  <OvalSpinner />
                </div>
              )}
              {sountrackVideo && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${sountrackVideo}`}
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
        <div className={styles.VideoGameplay}>
          <div
            className={styles.VideoLabel}
            onClick={(e) => toggleBlockVisibilty(e)}
            elm="gameplayVideo">
            <h2>Gameplay</h2>
            {isMobile && (
              <div className={styles.DropDownSvgContainer}>
                <ArrowEsc arrow={!elmsVisibility.gameplayVideo} />
              </div>
            )}
            <hr></hr>
          </div>
          {elmsVisibility.gameplayVideo && (
            <div className={styles.PlayerWrapper}>
              {!gameplayVideo && (
                <div className={styles.OvalSpinnerWrapper}>
                  <OvalSpinner />
                </div>
              )}
              {gameplayVideo && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${gameplayVideo}`}
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
      </div>
      <div className={styles.EbaySection}>
        <div
          className={styles.EbayLabel}
          elm="ebaySection"
          onClick={(e) => toggleBlockVisibilty(e)}>
          <h2>Ebay Offers</h2>
          {isMobile && (
            <div className={styles.DropDownSvgContainer}>
              <ArrowEsc arrow={!elmsVisibility.ebaySection} />
            </div>
          )}
          <hr></hr>
        </div>
        {gameDetails && elmsVisibility.ebaySection && (
          <EbaySection
            platform={platformName}
            game={gameDetails.name}
            isMobile={isMobile}
          />
        )}
      </div>
      {!isMobile && (
        <>
          <CornerNotifier
            corner={'bottomLeft'}
            message={'Game has been added to you'}
            linkText={'Wish List'}
            linkDir={'/profile/WishList'}
            btnText={'Cancel'}
            onCancelClick={() =>
              toggleList(platformName, gameDetails, 'wish_list', 'removeGame')
            }
            show={showWishNotifier}
          />
          <CornerNotifier
            corner={'bottomLeft'}
            message={'Game has been added to you'}
            linkText={'Owned List'}
            linkDir={'/profile/CollectionList'}
            btnText={'Cancel'}
            onCancelClick={() =>
              toggleList(platformName, gameDetails, 'owned_list', 'removeGame')
            }
            show={showOwnedhNotifier}
          />
        </>
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

export default connect(mapStateToProps)(GameDetailed);
