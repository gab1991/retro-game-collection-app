import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Backend from '../../Backend/Backend';
import styles from './GameDetailed.module.css';
import ReactHtmlParser from 'react-html-parser';
import GameInfoBox from './GameInfoBox/GameInfoBox';
import Slider from '../UI/Slider/Slider';
import ButtonNeon from '../UI/Buttons/ButtonNeon/ButtonNeon';
import { profile } from '../../actions/actions';
import WarnModal from '../UI/Modals/WarnModal/WarnModal';
import CornerNotifier from '../UI/Modals/CornerNotifier/CornerNotifier';
import EbaySection from './EbaySection/EbaySection';
import ReactPlayer from 'react-player';

function GameDetailed(props) {
  const slug = props.match.params.gameSlug;
  const platformName = props.match.params.platformName;
  const { userData, profileInfo } = props;
  const [gameDetails, setGameDetails] = useState();
  const [screenshots, setScreenshots] = useState();
  const [boxArtUrl, setBoxArtUrl] = useState();
  const [sountrackVideo, setSountrackVideo] = useState();
  const [isOwned, setisOwned] = useState();
  const [isWished, setisWished] = useState();
  const [descriptionParsed, setDescriptionParsed] = useState();
  const [showWishWarn, setShowWishListWarn] = useState();
  const [showWishNotifier, setShowWishNotifier] = useState(false);
  const [showOwnedhNotifier, setShowOwnedNotifier] = useState(false);
  const wishListWarnTxt =
    'You already got this game in your colletcion. Do you really want it in your Wish List';
  const dispatch = useDispatch();

  console.log({ isOwned, isWished });

  useEffect(() => {
    if (userData)
      Backend.getProfileInfo(userData.username, userData.token).then((res) =>
        dispatch(profile(res))
      );
  }, [userData]);

  useEffect(() => {
    if (profileInfo && gameDetails) isInListChecker();
  }, [profileInfo, gameDetails]);

  useEffect(() => {
    Backend.getGameDetails(slug).then((res) => {
      setGameDetails(res);
      const description = res.description;
      setDescriptionParsed(ReactHtmlParser(description));
    });

    Backend.getScreenshots(slug).then((res) => {
      const screenshotsUrls = [];
      res.results.forEach((obj) => screenshotsUrls.push(obj.image));
      setScreenshots(screenshotsUrls);
    });
  }, [slug]);

  useEffect(() => {
    if (gameDetails) {
      Backend.getBoxArt(platformName, gameDetails.name).then((res) =>
        setBoxArtUrl(res)
      );
      // Backend.getSoundTrackVideo(platformName, gameDetails.name).then(res =>
      //   setSountrackVideo(res)
      // );
    }
  }, [gameDetails, platformName]);

  const notifierHandler = (listState, listName) => {
    console.log(listState, listName);
    if (listState === false) {
      if (listName === 'wish_list') {
        console.log(showWishNotifier);
        setShowWishNotifier(!showWishNotifier);
        setTimeout(() => {
          setShowWishNotifier(false);
        }, 2000);
      } else if (listName === 'owned_list') {
        console.log(showOwnedhNotifier);
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

  const toggleList = (platform, gameDetails, list, action, accepted) => {
    let goFurther = needToShowWarning(list);

    accepted = true;
    if (goFurther || accepted) {
      const username = props.userData.username;
      const token = props.userData.token;

      if (!action) {
        if (list === 'owned_list') {
          action = isOwned ? 'removeGame' : 'addGame';
        } else if (list === 'wish_list') {
          action = isWished ? 'removeGame' : 'addGame';
        }
      }

      Backend.updateProfile(username, token, {
        action: action,
        list: list,
        platform: platform,
        game: gameDetails,
      }).then((res) => {
        if (res.success) {
          if (list === 'owned_list') {
            setisOwned((prevOwned) => {
              notifierHandler(prevOwned, list);
              return !prevOwned;
            });
          } else if (list === 'wish_list') {
            setisWished((prevWish) => {
              notifierHandler(prevWish, list);
              return !prevWish;
            });
          }
        }
      });
    }
  };

  const getBack = () => {
    props.history.push(props.history.location.state.from);
  };

  const hideWarning = () => {
    setShowWishListWarn(false);
  };

  const needToShowWarning = (list) => {
    if (list === 'wish_list' && isOwned && !isWished) {
      setShowWishListWarn(true);
      return false;
    } else {
      return true;
    }
  };

  const wishListWarnHandler = () => {
    toggleList(platformName, gameDetails, 'wish_list', true);
    setShowWishListWarn(false);
  };

  return (
    <div className={styles.GameDetailed}>
      <div className={styles.Screenshots}>
        {screenshots && <Slider images={screenshots} arrows />}
      </div>
      <div className={styles.Info}>
        {gameDetails && boxArtUrl && (
          <GameInfoBox gameInfo={gameDetails} boxArt={boxArtUrl} />
        )}
      </div>
      <div className={styles.Desc}>
        <hr></hr>
        {descriptionParsed ? descriptionParsed : null}
      </div>
      <div className={styles.CommentArea}>
        <textarea placeholder="Type your remark concerning this game..."></textarea>
      </div>
      <div className={styles.Contorls}>
        <hr></hr>
        <div className={styles.Buttons}>
          <div>
            <ButtonNeon
              color={isWished ? 'red' : 'green'}
              txtContent={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={() => toggleList(platformName, gameDetails, 'wish_list')}
            />
          </div>
          <div>
            <ButtonNeon
              color={isOwned ? 'red' : 'green'}
              txtContent={isOwned ? 'Remove from Owned' : 'Owned'}
              onClick={() =>
                toggleList(platformName, gameDetails, 'owned_list')
              }
            />
          </div>
          <div>
            <ButtonNeon txtContent={'Back'} onClick={getBack} color="gray" />
          </div>
          {/* {showWishWarn && (
            <WarnModal
              message={wishListWarnTxt}
              onBackdropClick={hideWarning}
              onNoClick={hideWarning}
              onYesClick={wishListWarnHandler}
            />
          )} */}
        </div>
        <hr></hr>
      </div>
      <div className={styles.VideoSection}>
        <div className={styles.VideoSoundtrack}>
          <div className={styles.VideoLabel}>
            <h2>Sountrack</h2>
            <hr></hr>
          </div>
          <div className={styles.PlayerWrapper}>
            <ReactPlayer
              // url={`https://www.youtube.com/watch?v=${sountrackVideo}`}
              url={`https://www.youtube.com/watch?v=RGCTbLMkkb4`}
              className={styles.ReactPlayer}
              height="100%"
              width="100%"
              controls={true}
              playing={false}
              light
            />
          </div>
        </div>
        <div className={styles.VideoGameplay}>
          <div className={styles.VideoLabel}>
            <h2>Gameplay</h2>
            <hr></hr>
          </div>
          <div className={styles.PlayerWrapper}>
            <ReactPlayer
              // url={`https://www.youtube.com/watch?v=${sountrackVideo}`}
              url={`https://www.youtube.com/watch?v=kSmcxV35Xrg`}
              className={styles.ReactPlayer}
              height="100%"
              width="100%"
              controls={true}
              playing={false}
              light
            />
          </div>
        </div>
      </div>
      <div className={styles.EbaySection}>
        <h2>Ebay Offers</h2>
        <hr></hr>
        {gameDetails && (
          <EbaySection platform={platformName} game={gameDetails.name} />
        )}
      </div>

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
