import React from 'react';
import { useSelector } from 'react-redux';

import { SwiperConfigured } from 'Components/UI';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { selectScreenshots } from 'Store/gameDetailedReducer/selectors';

interface IScreenshotSectionProps {
  className?: string;
}

export function ScreenshotSection(props: IScreenshotSectionProps): JSX.Element {
  const { className } = props;
  const isMobile = useSelector(selectIsMobile);
  const screenshots = useSelector(selectScreenshots);

  return (
    <div className={className}>
      <SwiperConfigured
        images={[...screenshots]}
        isMobile={isMobile}
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
