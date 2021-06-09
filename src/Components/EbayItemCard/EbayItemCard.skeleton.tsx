import React from 'react';

import styles from './EbayItemCard.module.scss';

export function EbayItemCardSkeleton(): JSX.Element {
  return (
    <div className={styles.EbayItemCardSkeleton}>
      <div className={styles.SkeletonLeftPart}>
        <div className={styles.SkeletonImg}></div>
        <div className={styles.SkeletonAuction}></div>
      </div>
      <div className={styles.SkeletonRightPart}>
        <div className={styles.SkeletonBar}></div>
        <div className={styles.SkeletonBar}></div>
        <div className={styles.SkeletonBar}></div>
        <div className={styles.SkeletonBar}></div>
        <div className={styles.SkeletonBar}></div>
        <div className={styles.SkeletonBar}></div>
      </div>
    </div>
  );
}
