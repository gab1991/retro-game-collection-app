import React, { SVGAttributes } from 'react';

export function EscSvg(props: SVGAttributes<SVGSVGElement>): JSX.Element {
  return (
    <svg viewBox={'0 0 42 42'} fill='currentColor' {...props}>
      <path d='M8.34465e-07 2.82843L2.82843 0L41.0122 38.1838L38.1838 41.0122L8.34465e-07 2.82843Z' />
      <path d='M41.0122 2.82843L38.1838 0L0 38.1838L2.82843 41.0122L41.0122 2.82843Z' />
    </svg>
  );
}
