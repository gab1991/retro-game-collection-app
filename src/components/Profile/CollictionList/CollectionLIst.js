import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './CollectionList.module.scss';
import GameBoxContainer from './../GameBoxContainer/GameBoxContainer';
import { images } from '../../../configs/appConfig';
import { connect } from 'react-redux';
import ButtonNeon from '../../UI/Buttons/ButtonNeon/ButtonNeon';

function CollectionLIst(props) {
  const { profileInfo } = props;
  const [ownedList, setOwnedList] = useState({ platforms: [], count: 0 });

  useEffect(() => {
    if (profileInfo) {
      const platformsOwned = profileInfo.owned_list.platforms;
      setOwnedList({ platforms: platformsOwned, count: platformsOwned.length });
    } else {
      setOwnedList({ platforms: [], count: 0 });
    }
  }, [profileInfo]);

  const toPlatfromSelecor = () => {
    props.history.push('/');
  };
  const toGameSelector = (platform) => {
    props.history.push(`/${platform}`);
  };

  return (
    <div className={styles.CollectionLIst}>
      <div className={styles.SectionName}>
        <h1>My Collection</h1>
      </div>
      <div className={styles.ShelvesContainer}>
        {ownedList &&
          ownedList.platforms.map((platform) => (
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
    profileInfo: state.profile,
  };
}

export default withRouter(connect(mapStateToProps)(CollectionLIst));
