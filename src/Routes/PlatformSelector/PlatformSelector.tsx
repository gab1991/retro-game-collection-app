import React from 'react';

import { PlatformCard } from '../../Components/PlatformCard/PlatformCard';

import styles from './PlatformSelector.module.scss';

export function PlatformSelector(): JSX.Element {
  const availablePlatforms = ['Genesis', 'PlayStation', 'NES'];

  return (
    <section className={styles.PlatformSelector}>
      <h1 className={styles.Heading}>CHOOSE YOUR PLATFORM</h1>
      <div className={styles.PlatformContainer}>
        {availablePlatforms.map((platform) => (
          <PlatformCard key={platform} name={platform} className={styles.PlatformCard} />
        ))}
      </div>
    </section>
  );
}
