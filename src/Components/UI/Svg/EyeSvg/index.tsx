import React, { SVGAttributes } from 'react';

export function EyeSvg(props: SVGAttributes<SVGSVGElement>): JSX.Element {
  return (
    <svg width='100%' height='100%' viewBox='0 0 718 518' fill='none' {...props}>
      <g filter='url(#prefix__filter0_d)'>
        <path
          d='M359 106.688a130.88 130.88 0 00-38.942 6.621c5.836 10.902 8.943 23.212 9.025 35.753a78.187 78.187 0 01-5.313 28.379c-3.508 8.997-8.65 17.172-15.132 24.058-6.482 6.886-14.178 12.348-22.647 16.075-8.469 3.727-17.546 5.645-26.713 5.645-11.806-.087-23.394-3.388-33.656-9.588-8.098 29.832-7.154 61.614 2.697 90.845 9.851 29.23 28.109 54.427 52.189 72.022 24.08 17.594 52.761 26.694 81.979 26.01 29.219-.684 57.494-11.117 80.822-29.821 23.327-18.703 40.523-44.73 49.152-74.393 8.63-29.663 8.255-61.459-1.071-90.883-9.326-29.424-27.13-54.985-50.891-73.063-23.761-18.077-52.273-27.754-81.499-27.66zm354.662 128.978C646.063 95.551 512.236.75 359 .75S71.9 95.617 4.338 235.68C1.486 241.672 0 248.292 0 255.007c0 6.714 1.485 13.334 4.337 19.327C71.938 414.449 205.764 509.25 359 509.25s287.1-94.867 354.662-234.93c2.852-5.992 4.337-12.612 4.337-19.327 0-6.714-1.485-13.334-4.337-19.327zM359 445.688c-122.97 0-235.706-72.833-296.586-190.688C123.294 137.145 236.018 64.312 359 64.312S594.706 137.145 655.586 255C594.718 372.855 481.982 445.688 359 445.688z'
          fill='#A4A4A4'
        />
      </g>
      <defs>
        <filter
          id='prefix__filter0_d'
          x={-3.999}
          y={0.75}
          width={725.999}
          height={516.5}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
          <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
        </filter>
      </defs>
    </svg>
  );
}
