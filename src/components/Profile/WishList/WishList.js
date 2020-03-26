import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './WishList.css';
import GameBoxContainer from './../GameBoxContainer/GameBoxContainer';
import { images } from '../../../configs/appConfig';
import Backend from '../../../Backend/Backend';
import { connect, useDispatch } from 'react-redux';
import { profile } from '../../../actions/actions';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';

function WishList(props) {
  const { userData, profileInfo } = props;
  const [wishedList, setWishedList] = useState({ platforms: [], count: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData)
      Backend.getProfileInfo(userData.username, userData.token).then(res =>
        dispatch(profile(res))
      );
  }, [userData]);

  useEffect(() => {
    if (profileInfo) {
      const platformsWished = profileInfo.wish_list.platforms;
      setWishedList({
        platforms: platformsWished,
        count: platformsWished.length
      });
    }
  }, [profileInfo]);

  const toPlatfromSelecor = () => {
    props.history.push('/');
  };
  const toGameSelector = platform => {
    props.history.push(`/${platform}`);
  };

  return (
    <div className={styles.WishLIst}>
      <div className={styles.SectionName}>
        <h1>Wish List</h1>
      </div>
      <div className={styles.ShelvesContainer}>
        {wishedList &&
          wishedList.platforms.map(platform => (
            <div key={platform.name} className={styles.Shelf}>
              <div
                className={styles.PlatformLogo}
                onClick={() => toGameSelector(platform.name)}>
                <img src={images[platform.name].logo.src} alt={platform.name} />
              </div>
              <GameBoxContainer
                platform={platform.name}
                games={platform.games}
              />
            </div>
          ))}
        <div className={styles.EmptyList}>
          <h1>Wanna add some?</h1>
          <ButtonNeon
            txtContent={'Start Adding Games'}
            onClick={toPlatfromSelecor}
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile
  };
}

export default withRouter(connect(mapStateToProps)(WishList));
