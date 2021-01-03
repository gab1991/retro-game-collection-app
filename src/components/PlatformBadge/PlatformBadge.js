import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../Configs/appConfig';

import styles from './PlatformBadge.module.scss';

export default function PlatformBadge(props) {
  const { platformName, className } = props;
  return (
    <Link to={`/${platformName}`} className={`${className} ${styles.PlatformBadge}`}>
      <img src={images[platformName].logo.src} alt={platformName} />
    </Link>
  );
}
