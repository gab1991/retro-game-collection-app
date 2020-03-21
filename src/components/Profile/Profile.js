import React, { useEffect, useState } from 'react';
import styles from './Profile.css';
import AuthModal from '../AuthModal/AuthModal';
import Backend from '../../Backend/Backend';
import GameBoxContainer from './GameBoxContainer/GameBoxContainer';
import { connect, useDispatch } from 'react-redux';
import { profile } from '../../actions/actions';

function Profile(props) {
  const { userData, profileInfo } = props;
  const [ownedList, setOwnedList] = useState();
  const dispatch = useDispatch();
  console.log(props);

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
    <div className={styles.Profile}>
      <div className={styles.ShelvesContainer}>
        {ownedList &&
          ownedList.map(platform => (
            <div key={platform.name} className={styles.Shelf}>
              <GameBoxContainer
                platform={platform.name}
                games={platform.games}
              />
              <div className={styles.ShelfBoard}>{platform.name}</div>
            </div>
          ))}
      </div>
      {!userData && <AuthModal />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.logged,
    profileInfo: state.profile
  };
}

export default connect(mapStateToProps)(Profile);
