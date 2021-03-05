import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PlatformBadge from '../../../Components/PlatformBadge/PlatformBadge';
import GameLotContainer from './GameLotContainer/GameLotContainer';
import { ButtonNeon } from 'Components/UI';

import styles from './WishList.module.scss';

function WishList(props) {
  const { profileInfo } = props;
  const [wishedList, setWishedList] = useState([]);

  useEffect(() => {
    if (profileInfo) {
      setWishedList(profileInfo?.wish_list?.platforms || []);
    } else {
      setWishedList([]);
    }
  }, [profileInfo]);

  const toPlatfromSelecor = () => {
    props.history.push('/');
  };

  return (
    <div className={styles.WishLIst}>
      <h1 className={styles.SectionName}>Wish List</h1>
      <div className={styles.ShelvesContainer}>
        {wishedList.map(({ name: platformName, games }) => (
          <div key={platformName} className={styles.Shelf}>
            <PlatformBadge className={styles.PlatformLogo} platformName={platformName} />
            <GameLotContainer platform={platformName} games={games} />
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

export default withRouter(connect(mapStateToProps)(WishList));
