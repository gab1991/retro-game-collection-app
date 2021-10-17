import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { images, TPlatformNames } from '../../Configs/appConfig';

import styles from './PlatformBadge.module.scss';

interface IPlatformBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  platform: TPlatformNames;
}

export function PlatformBadge(props: IPlatformBadgeProps): JSX.Element {
  const { platform, className, ...htmlProps } = props;
  return (
    <Link to={`/${platform}`} className={cn(styles.PlatformBadge, className)} {...htmlProps}>
      <img src={images[platform].logo.src} alt={platform} />
    </Link>
  );
}
