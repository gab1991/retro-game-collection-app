import React from 'react';
import PlatformCard from '../PlatformCard/PlatformCard';
import styles from './PlatformSelector.module.scss';

function PlatformSelector(props) {
  const availablePlatforms = ['Genesis', 'PlayStation', 'NES'];

  return (
    <section className={styles.PlatformSelector}>
      <h1 className={styles.Heading}>Choose your platform</h1>
      <div className={styles.PlatformContainer}>
        {availablePlatforms.map((platform) => (
          <PlatformCard key={platform} name={platform} className={styles.PlatformCard} />
        ))}
      </div>
    </section>
  );
}

export default PlatformSelector;
