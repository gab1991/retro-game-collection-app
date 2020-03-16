import React, { useState, useEffect } from 'react';
import styles from './PlatformSelector.css';
import PlatformCard from '../PlatformCard/PlatformCard';
import Backend from '../../Backend/Backend';

export default function PlatformSelector(props) {
  const availablePlatforms = ['Genesis', 'NES'];
  const [allPlatromsList, setAllPlatformsList] = useState();

  useEffect(() => {
    Backend.getAllPlatfroms().then(res =>
      setAllPlatformsList([...res.results])
    );
  }, []);

  const selectPlatformHandler = platformName => {
    props.history.push(`/${platformName}`);
  };

  return (
    <div className={styles.PlatformSelector}>
      <div className={styles.box1}>
        <h1 className={styles.PlatformSelectorHeading}>Choose your platform</h1>
      </div>
      <div className={styles.PlatformContainer}>
        {availablePlatforms.map(platform => (
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
