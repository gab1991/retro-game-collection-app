import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './GameDetailed.module.scss';
import Backend from '../../Backend/Backend';
import { textMessages } from '../../configs/appConfig';
import useWindowSize from '../../CustomHooks/useWindowSize';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import WarnModal from '../UI/Modals/WarnModal/WarnModal';
import CornerNotifier from '../UI/Modals/CornerNotifier/CornerNotifier';
import EbaySection from './EbaySection/EbaySection';
import ReactPlayer from 'react-player';
import ArrowEsc from '../UI/LogoSvg/ArrowEscSvg/ArrowEsc';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';

const mobileBreakPointWidth = 600;

function GameDetailed(props) {
  const slug = props.match.params.gameSlug;
  const platformName = props.match.params.platformName;
  const { profileInfo } = props;
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
      Backend.getBoxArt(platformName, gameDetails.name).then((res) => {
        if (isSubscribed) setBoxArtUrl(res);
      });

      Backend.getVideo('sountrack', platformName, gameDetails.name).then(
        (res) => {
          if (isSubscribed) setSountrackVideo(res);
        }
      );

      Backend.getVideo('gameplay', platformName, gameDetails.name).then(
        (res) => {
          if (isSubscribed) setGameplayVideo(res);
        }
      );
    }
    return () => {
      isSubscribed = false;
    };
  }, [gameDetails, platformName]);

  const notifierHandler = (listState, listName) => {
    if (listState === false) {
      if (listName === 'wish_list') {
        setShowWishNotifier(!showWishNotifier);
        setTimeout(() => {
          setShowWishNotifier(false);
        }, 2000);
      } else if (listName === 'owned_list') {
        setShowOwnedNotifier(!showOwnedhNotifier);
        setTimeout(() => {
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

  const toggleList = (platform, gameDetails, list, action) => {
    const notifierBlock = needToShowWarning(list);

    const token = props.userData.token;

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
    }).then((res) => {
      if (res.success) {
        if (list === 'owned_list') {
          setisOwned((prevOwned) => {
            if (!notifierBlock) notifierHandler(prevOwned, list);
            return !prevOwned;
          });
        } else if (list === 'wish_list') {
          setisWished((prevWish) => {
            if (!notifierBlock) notifierHandler(prevWish, list);
            return !prevWish;
          });
        }
      }
    });
  };

  const getBack = () => {
    props.history.push(props.history.location.state.from);
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

  const swiperSettings = {
    slidesPerView: 'auto',
    spaceBetween: 15,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  return (
    <div className={styles.GameDetailed}>
      <div className={styles.ScreenshotSection}>
        <Swiper
          swiperOptions={{ ...swiperSettings }}
          loop={true}
          pagination={false}>
          {screenshots &&
            screenshots.map((image, index) => (
              <Slide key={index}>
                <img src={image}></img>
              </Slide>
            ))}
        </Swiper>
      </div>
      <div className={styles.InfoSection}>
        {gameDetails && boxArtUrl && (
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
              color={isWished ? 'red' : 'green'}
              txtContent={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={() => toggleList(platformName, gameDetails, 'wish_list')}
            />
          </div>
          <div className={styles.ButtonWrapper}>
            <ButtonNeon
              color={isOwned ? 'red' : 'green'}
              txtContent={isOwned ? 'Remove from Owned' : 'Owned'}
              onClick={() =>
                toggleList(platformName, gameDetails, 'owned_list')
              }
            />
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
      <div className={styles.VideoSection}>
        <div className={styles.VideoSoundtrack}>
          <div className={styles.VideoLabel}>
            <h2>Sountrack</h2>
            {isMobile && (
              <div
                elm="sountrackVideo"
                className={styles.DropDownSvgContainer}
                onClick={(e) => toggleBlockVisibilty(e)}>
                <ArrowEsc arrow={!elmsVisibility.sountrackVideo} />
              </div>
            )}
            <hr></hr>
          </div>
          {elmsVisibility.sountrackVideo && (
            <div className={styles.PlayerWrapper}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${sountrackVideo}`}
                // url={`https://www.youtube.com/watch?v=RGCTbLMkkb4`}
                className={styles.ReactPlayer}
                height="100%"
                width="100%"
                controls={true}
                playing={false}
                light
              />
            </div>
          )}
        </div>
        <div className={styles.VideoGameplay}>
          <div className={styles.VideoLabel}>
            <h2>Gameplay</h2>
            {isMobile && (
              <div
                elm="gameplayVideo"
                className={styles.DropDownSvgContainer}
                onClick={(e) => toggleBlockVisibilty(e)}>
                <ArrowEsc arrow={!elmsVisibility.gameplayVideo} />
              </div>
            )}
            <hr></hr>
          </div>
          {elmsVisibility.gameplayVideo && (
            <div className={styles.PlayerWrapper}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${gameplayVideo}`}
                // url={`https://www.youtube.com/watch?v=kSmcxV35Xrg`}
                className={styles.ReactPlayer}
                height="100%"
                width="100%"
                controls={true}
                playing={false}
                light
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.EbaySection}>
        <div className={styles.EbayLabel}>
          <h2>Ebay Offers</h2>
          {isMobile && (
            <div
              elm="ebaySection"
              className={styles.DropDownSvgContainer}
              onClick={(e) => toggleBlockVisibilty(e)}>
              <ArrowEsc arrow={!elmsVisibility.ebaySection} />
            </div>
          )}
          <hr></hr>
        </div>

        {gameDetails && elmsVisibility.ebaySection && (
          <EbaySection platform={platformName} game={gameDetails.name} />
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
            linkDir={'/profile/OwnedList'}
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
