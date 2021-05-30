import React from 'react';

export const SkeletonLinGradId = 'left-to-right';

export function SkeletonLinGradSvg(): JSX.Element {
  const color1 = '#0a0a0a';
  const color2 = '#858585';

  return (
    <defs>
      <linearGradient id={SkeletonLinGradId}>
        <stop offset='0%' stopColor={color1}>
          <animate
            attributeName='stop-color'
            values={`${color1}; ${color2}; ${color1}`}
            dur='7s'
            repeatCount='indefinite'
          ></animate>
        </stop>

        <stop offset='100%' stopColor={color2}>
          <animate
            attributeName='stop-color'
            values={`${color2}; ${color1}; ${color2}`}
            dur='7s'
            repeatCount='indefinite'
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  );
}
