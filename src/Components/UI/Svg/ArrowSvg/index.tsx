import React, { SVGAttributes } from 'react';

export function ArrowSvg(props: SVGAttributes<SVGSVGElement>): JSX.Element {
  return (
    <svg width='100%' height='100%' viewBox='0 0 400 400' fill='currentColor' {...props}>
      <path d='M 100 100 L 300 100 L 200 300 z' strokeWidth='3' />
    </svg>
  );
}
