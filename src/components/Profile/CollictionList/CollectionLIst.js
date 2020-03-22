import React, { useState, useEffect } from 'react';
import styles from './CollectionList.css';
import GameBoxContainer from './../GameBoxContainer/GameBoxContainer';
import { images } from '../../../configs/appConfig';
import Backend from '../../../Backend/Backend';
import { connect, useDispatch } from 'react-redux';
import { profile } from '../../../actions/actions';

function CollectionLIst(props) {
  const { userData, profileInfo } = props;
  const [ownedList, setOwnedList] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    Backend.getProfileInfo(userData.username, userData.token).then(res =>
      dispatch(profile(res))
    );
  }, [userData]);

  useEffect(() => {
    if (profileInfo) {
      const platformsOwned = profileInfo.owned_list.platforms;
      setOwnedList(platformsOwned);
    }
  }, [profileInfo]);

  return (
    <div className={styles.CollectionLIst}>
      <div className={styles.SectionName}>
        <h1>My Collection</h1>
      </div>
      <div className={styles.ShelvesContainer}>
        {ownedList &&
          ownedList.map(platform => (
            <div key={platform.name} className={styles.Shelf}>
              <div className={styles.PlatformLogo}>
                <img src={images[platform.name].logo.src} alt={props.name} />
              </div>
              <GameBoxContainer
                platform={platform.name}
                games={platform.games}
              />
            </div>
          ))}
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

export default connect(mapStateToProps)(CollectionLIst);
