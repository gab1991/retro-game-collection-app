import React, { HTMLAttributes } from 'react';

type TOvalSpinnerProps = HTMLAttributes<SVGElement>;

export function OvalSpinner(props: TOvalSpinnerProps): JSX.Element {
  return (
    <svg width='100%' height='100%' viewBox='0 0 38 38' stroke='#fff' {...props}>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)' strokeWidth='2'>
          <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
          <path d='M36 18c0-9.94-8.06-18-18-18'>
            <animateTransform
              attributeName='transform'
              type='rotate'
              from='0 18 18'
              to='360 18 18'
              dur='1s'
              repeatCount='indefinite'
            />
          </path>
        </g>
      </g>
    </svg>
  );
}
