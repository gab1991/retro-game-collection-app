import React, { useEffect } from 'react';
import styles from './PlatformSelector.module.scss';
import PlatformCard from '../PlatformCard/PlatformCard';
import { connect, useDispatch } from 'react-redux';
import { cacheGameSelector } from '../../actions/actions';

function PlatformSelector(props) {
  const availablePlatforms = ['Genesis', 'PlayStation', 'NES'];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cacheGameSelector({}));
  }, []);

  const selectPlatformHandler = (platformName) => {
    props.history.push(`/${platformName}`);
  };

  return (
    <div className={styles.PlatformSelector}>
      <div className={styles.PlatformSelectorHeading}>
        <h1>Choose your platform</h1>
      </div>
      <div className={styles.PlatformContainer}>
        {availablePlatforms.map((platform) => (
          <PlatformCard
            key={platform}
            name={platform}
            selectPlatform={selectPlatformHandler}
          />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    dataCache: state.dataCache,
  };
}

export default connect(mapStateToProps)(PlatformSelector);
