import React from 'react';

import { ISkeletonInjectableSVG } from '../types';

type TGenesisBoxSvgProps = ISkeletonInjectableSVG;

export function GenesisBoxSvg(props: TGenesisBoxSvgProps): JSX.Element {
  const { innerComponent, pathFill } = props;

  return (
    <svg viewBox='0 0 298 465' {...props}>
      {innerComponent}
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M.5 41L44 25l50.5 4.5 2.5-26 7-3.5 86.5 10 7.5 3 1 2.5-3 24 100.5 10 1.5 2V436L49 464.5h-7l-40-16-1.5-4V41zM116 31l60 6.5s3-7-3.5-9.5L155 26.5c0-9.5-11.5-11.5-15-1l-15.5-2c-8.176-1.071-9.824 7.42-8.5 7.5z'
        fill={pathFill || 'black'}
      />
    </svg>
  );
}
