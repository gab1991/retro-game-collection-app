import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlatformBadge from '../../../Components/PlatformBadge/PlatformBadge';
import GameBoxContainer from './GameBoxContainer/GameBoxContainer';
import { ButtonNeon } from 'Components/UI';

import styles from './CollectionList.module.scss';

function CollectionLIst(props) {
  const { profileInfo } = props;
  const [ownedList, setOwnedList] = useState([]);

  useEffect(() => {
    if (profileInfo) {
      setOwnedList(profileInfo?.owned_list?.platforms || []);
    } else {
      setOwnedList([]);
    }
  }, [profileInfo]);

  const toPlatfromSelecor = () => {
    props.history.push('/');
  };

  return (
    <div className={styles.CollectionLIst}>
      <h1 className={styles.SectionName}>My Collection</h1>
      <div className={styles.ShelvesContainer}>
        {ownedList.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platformName={platformName} />
            <GameBoxContainer platform={platformName} games={games} />
          </div>
        ))}
        <div className={styles.EmptyList}>
          <h1>Wanna add some?</h1>
          <ButtonNeon txtContent={'Start Adding Games'} onClick={toPlatfromSelecor} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profileInfo: state.profile,
  };
}

export default withRouter(connect(mapStateToProps)(CollectionLIst));
