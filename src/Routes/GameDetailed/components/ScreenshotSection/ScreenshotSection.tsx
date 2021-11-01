import React, { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';

import { SwiperConfigured } from 'Components/UI';
import { selectScreenshots } from 'Routes/GameDetailed/reducer/selectors';

type TScreenshotSectionProps = HTMLAttributes<HTMLDivElement>;

export function ScreenshotSection(props: TScreenshotSectionProps): JSX.Element {
  const screenshots = useSelector(selectScreenshots);

  return (
    <div {...props}>
      <SwiperConfigured
        slides={screenshots.map((url) => (
          <img src={url} alt={url} key={url} />
        ))}
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
