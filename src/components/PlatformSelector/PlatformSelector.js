import React from 'react';
import styles from './PlatformSelector.module.scss';
import PlatformCard from '../PlatformCard/PlatformCard';
import ErrorModal from '../UI/Modals/ErrorModal/ErrorModal.js';

export default function PlatformSelector(props) {
  const availablePlatforms = ['Genesis', 'PlayStation', 'NES'];

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
