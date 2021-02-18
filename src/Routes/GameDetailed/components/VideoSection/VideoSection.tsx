import React, { SyntheticEvent } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import { isToggleableElms, IUploadableElmemnt, TToggleableEmls } from 'Store/gameDetailedReducer/types';

import { OvalSpinner } from 'Components/UI';
import { ArrowEsc } from 'Components/UI/LogoSvg';
import { selectIsMobile } from 'Store/appStateReducer/selectors';
import { toggleElmVisibility } from 'Store/gameDetailedReducer/actions';
import { selectVideos } from 'Store/gameDetailedReducer/selectors';

import styles from './VideoSection.module.scss';

interface IVideoElms {
  className: string;
  elm: TToggleableEmls;
  heading: string;
  video: IUploadableElmemnt;
}

export function VideoSection(): JSX.Element {
  const { gameplayVideo, soundtrackVideo } = useSelector(selectVideos);
  const isMobile = useSelector(selectIsMobile);
  const dispatch = useDispatch();

  const videoElms: IVideoElms[] = [
    {
      className: styles.VideoSoundtrack,
      elm: 'soundtrackVideo',
      heading: 'Soundtrack',
      video: soundtrackVideo,
    },
    {
      className: styles.VideoGameplay,
      elm: 'gameplayVideo',
      heading: 'Gameplay',
      video: gameplayVideo,
    },
  ];

  const toggleBlockVisibilty = (e: SyntheticEvent) => {
    const elm = e.currentTarget.getAttribute('data-elm');
    // analyze later
    if (elm && isToggleableElms(elm)) {
      dispatch(toggleElmVisibility(elm));
    }
  };

  return (
    <div className={styles.VideoSection}>
      {videoElms.map(({ className, elm, heading, video }) => (
        <div className={className} key={elm}>
          <div
            role='button'
            tabIndex={0}
            className={`${styles.VideoLabel}`}
            data-elm={elm}
            onKeyPress={toggleBlockVisibilty}
            onClick={toggleBlockVisibilty}
          >
            <h2>{heading}</h2>
            {isMobile && (
              <div className={styles.DropDownSvgContainer}>
                <ArrowEsc arrow={!video.show} />
              </div>
            )}
            <hr></hr>
          </div>
          {video.show && (
            <div className={styles.PlayerWrapper}>
              {!video.url && (
                <div className={styles.OvalSpinnerWrapper}>
                  <OvalSpinner />
                </div>
              )}
              {video.url && (
                <ReactPlayer
                  url={video.url}
                  className={styles.ReactPlayer}
                  height='100%'
                  width='100%'
                  controls={true}
                  playing={false}
                  light
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
