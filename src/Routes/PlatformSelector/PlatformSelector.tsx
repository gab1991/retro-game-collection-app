import React from 'react';

import { PlatformCard } from '../../Components/PlatformCard/PlatformCard';
import { ButtonBasic } from 'Components/UI/Buttons/ButtonBasic';

import styles from './PlatformSelector.module.scss';

export function PlatformSelector(): JSX.Element {
  const availablePlatforms = ['Genesis', 'PlayStation', 'NES'];

  return (
    <section className={styles.PlatformSelector}>
      <h1 className={styles.Heading}>Choose your platform</h1>
      <div className={styles.PlatformContainer}>
        {availablePlatforms.map((platform) => (
          <PlatformCard key={platform} name={platform} className={styles.PlatformCard} />
        ))}
      </div>
      <ButtonBasic txtContent='kek' />
    </section>
  );
}
