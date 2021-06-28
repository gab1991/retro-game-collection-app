import React from 'react';

type TSixDotsProps = React.HTMLAttributes<SVGElement>;

export function SixDots(props: TSixDotsProps): JSX.Element {
  return (
    <svg viewBox='0 0 20 20' {...props}>
      <path d='M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z' />
    </svg>
  );
}
