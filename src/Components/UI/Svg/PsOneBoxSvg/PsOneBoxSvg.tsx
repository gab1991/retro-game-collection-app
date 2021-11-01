import * as React from 'react';

import { ISkeletonInjectableSVG } from '../types';

type TPsONeBoxSvg = ISkeletonInjectableSVG;

export function PsOneBoxSvg(props: TPsONeBoxSvg): JSX.Element {
  const { innerComponent, pathFill, ...rest } = props;

  return (
    <svg viewBox='0 0 566 551' {...rest}>
      {innerComponent}
      <path d='M.5 534.5l26 15 534.5-35 3.5-480L26 1 .5 15.5v519z' stroke='#000' fill={pathFill || 'black'} />
    </svg>
  );
}
