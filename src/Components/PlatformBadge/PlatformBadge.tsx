import React from 'react';
import { Link } from 'react-router-dom';

import { images, TPlatformNames } from '../../Configs/appConfig';

import styles from './PlatformBadge.module.scss';

interface IPlatformBadgeProps {
  className?: string;
  platform: TPlatformNames;
}

export function PlatformBadge(props: IPlatformBadgeProps): JSX.Element {
  const { platform, className } = props;
  return (
    <Link to={`/${platform}`} className={`${styles.PlatformBadge} ${className} `}>
      <img src={images[platform].logo.src} alt={platform} />
    </Link>
  );
}
