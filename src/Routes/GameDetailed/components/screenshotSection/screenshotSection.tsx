import React from 'react';
import { useSelector } from 'react-redux';

import { SwiperConfigured } from 'Components/UI';
import { selectScreenshots } from 'Routes/GameDetailed/gameDetailedReducer/selectors';

interface IScreenshotSectionProps {
  className?: string;
}

export function ScreenshotSection(props: IScreenshotSectionProps): JSX.Element {
  const { className } = props;
  const screenshots = useSelector(selectScreenshots);

  return (
    <div className={className}>
      <SwiperConfigured
        images={[...screenshots]}
        customSwiperProps={{
          loop: true,
          loopedSlides: 3,
          pagination: false,
          spaceBetween: 0,
        }}
      />
    </div>
  );
}
