import * as React from 'react';

import { ISkeletonInjectableSVG } from '../types';

type TNesBoxSvgProps = ISkeletonInjectableSVG;

export function NesBoxSvg(props: TNesBoxSvgProps): JSX.Element {
  const { pathFill, innerComponent } = props;

  return (
    <svg viewBox='0 0 322 499' {...props}>
      {innerComponent}
      <path d='M59.5 1L.5 19.5V473l59 24.5 261.5-40v-424L59.5 1z' fill={pathFill || 'black'} />
    </svg>
  );
}
